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
      const { sender,recipient, text, /*media, call*/ } = req.body;
      //const sender = req.user.userId;
  
      if (!recipient || (!text.trim() /*&& media.length === 0 && !call*/)) return;
  
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
        //   media,
        //   call,
        },
        { new: true, upsert: true }
      );
  
      const newMessage = new Messages({
        conversation: newConversation._id,
        sender,
        //sender:req.user.userId,
        //call,
        recipient,
        text,
        //media,
      });
  
      await newMessage.save();
  
      res.json({ msg: "Create Success!", data: newMessage });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  exports.getConversations= async (req, res) => {
    try {
      const features = new APIfeatures(
        Conversations.find({
          recipients: req.user._id,
        }),
        req.query
      ).paginating();

      const conversations = await features.query
        .sort("-updatedAt")
        .populate("recipients", "avatar username fullname");

      res.json({
        conversations,
        result: conversations.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  exports.getMessages = async (req, res) => {
    try {
      const features = new APIfeatures(
        Messages.find({
          $or: [
            { sender: req.user._id, recipient: req.params.id },
            { sender: req.params.id, recipient: req.user._id },
          ],
        }),
        req.query
      ).paginating();

      const messages = await features.query.sort("-createdAt");

      res.json({
        messages,
        result: messages.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }

  // exports.deleteMessages = async (req, res) => {
  //   try {
  //     const deleteMsg = await Messages.findOneAndDelete({
  //       _id: req.params.id, //id= message id
  //       sender: req.user._id,
  //     });
  //     res.json({ msg: "Delete Success!", data: deleteMsg });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // }

