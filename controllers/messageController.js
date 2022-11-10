const Conversations = require("../models/conversationModel");
const Messages = require("../models/messageModel");
const Users = require("../models/userModel");
const Admins = require("../models/adminModel");

class APIfeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 9;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  exports.createMessage = async (req, res) => {
    try {
      const { sender, recipient, text, media, call } = req.body;
  
      if (!recipient || (!text.trim() && media.length === 0 && !call)) return;
  
      const newConversation = await Conversations.findOneAndUpdate(
        {
          $or: [
            { recipients: [sender, recipient] },
            { recipients: [recipient, sender] },
          ],
        },
        {
          recipients: [sender, recipient],
          text,
          media,
          call,
        },
        { new: true, upsert: true }
      );
  
      const newMessage = new Messages({
        conversation: newConversation._id,
        sender,
        call,
        recipient,
        text,
        media,
      });
  
      await newMessage.save();
  
      res.json({ msg: "Create Success!", data: newMessage });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }