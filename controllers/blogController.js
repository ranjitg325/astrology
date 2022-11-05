const blogModel = require("../models/blogModel");
const adminModel = require("../models/adminModel")
const aws = require("../aws/aws");

exports.blogCreate = async (req, res) => {
    try {
        let {
            //image,
            title,
            description,
            content,
            category
        } = req.body;
        let images = req.files;
        if (!title || !description || !content || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (req.files && req.files.length > 0) {
            images = await Promise.all(
                req.files.map(async (file) => {
                    return await aws.uploadToS3(file.buffer);
                })
            );
        }
        const newBlog = new blogModel({
            images,
            title,
            description,
            content,
            category,
            subAdmin: req.user.adminId
        });
        const blogData = await newBlog.save();
        return res
            .status(201)
            .send({ message: "blog created successfully", data: blogData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getAllBlogsOfOwn = async (req, res) => {
    try {
        const subAdmin = req.user.adminId;
        const blogCount = await blogModel.find({ subAdmin: subAdmin, isDeleted: false }).count();
        const blogData = await blogModel.find({ subAdmin: subAdmin, isDeleted: false });
        return res.status(200).send({ msg: "blogs fetched successfully", count: blogCount, data: blogData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getAllBlogsCreated = async (req, res) => {
    try {
        const blogCount = await blogModel.find({ isDeleted: false }).count();
        const blogData = await blogModel.find({ isDeleted: false });
        return res.status(200).send({ msg: "blogs fetched successfully", count: blogCount, data: blogData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

// exports.getBlogById = async (req, res) => {
//     try {
//         const blogId = req.body.blogId;
//         const blogData = await blogModel.findOne({ _id: blogId, isDeleted: false });
//         return res.status(200).send({ msg: "blog fetched successfully", data: blogData });
//     } catch (err) {
//         return res.status(500).send(err.message);
//     }
// }

exports.updateBlog = async (req, res) => {
    try {
        let {
            //image,
            title,
            description,
            content,
            category
        } = req.body;
        let images = req.files;

        if (req.files && req.files.length > 0) {
            images = await Promise.all(
                req.files.map(async (file) => {
                    return await aws.uploadToS3(file.buffer);
                })
            );
        }
        const updatedBlog = await blogModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                images,
                title,
                description,
                content,
                category,
                subAdmin: req.user.adminId
            },
            { new: true });

            if(!updatedBlog){
                return res.status(400).send({ message: "blog not found" });
            }
        return res.status(200).send({ msg: "blog updated successfully", data: updatedBlog });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

//delete blog by giving blog id
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await blogModel.find({
          _id: req.params.id,  //blog id
          subAdmin: req.user.adminId,
          isDeleted: false
        });

        if (blog) {
            const user = await blogModel.findOneAndUpdate({ _id: req.params.id, subAdmin: req.user.adminId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
           return res.status(200).send({ msg: "blog deleted successfully", data: user });
        } else {
           return res.status(400).send({ error: 'blog not found' });
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}