const blogModel = require("../models/blogModel");
const adminModel= require("../models/adminModel")

exports.blogCreate = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
      
        let {
            image,
            title,
            description,
            content,
            category
        } = req.body;

        const blogRequest = {
            image,
            title,
            description,
            content,
            category
        };
        const blogData = await blogModel.create(blogRequest);
        return res
            .status(201)
            .send({ message: "blog created successfully", data: blogData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
        //const subAdmin = req.body.subAdmin;
        const blogCount = await blogModel.find({/*subAdmin:subAdmin,*/ isDeleted: false }).count();
        const blogData = await blogModel.find({/* subAdmin : subAdmin,*/isDeleted: false });
        return res.status(200).send({ msg: "blogs fetched successfully", count: blogCount, data: blogData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const blogId = req.body.blogId;
        const blogData = await blogModel.findOne({ _id: blogId, isDeleted: false });
        return res.status(200).send({ msg: "blog fetched successfully", data: blogData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
        const blogId = req.body.blogId;
        let {
            image,
            title,
            description,
            content,
            category
        } = req.body;

        const blogRequest = {
            image,
            title,
            description,
            content,
            category
        };
        const blogData = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, blogRequest, { new: true });
        return res.status(200).send({ msg: "blog updated successfully", data: blogData });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const adminId = req.user.userId;
        const adminData = await adminModel.findOne({ _id: adminId });
        if (!adminData) {
          return res.status(401).send({ message: "You are not authorized" });
        }
        const blogId = req.body.blogId;
        const checkCard = await blogModel.find({ _id: blogId, isDeleted: false });
        if (checkCard) {
            const user = await blogModel.updateOne({ _id: blogId, isDeleted: false }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
            res.status(200).send({ msg: "blog deleted successfully", data: user });
        } else {
            res.status(400).send({ error: 'blog not found' });
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

       