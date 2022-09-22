const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const middleware = require("../middleware/authenticateUser");


router.post('/blogCreate', middleware.authenticateToken,blogController.blogCreate);
router.get('/getAllBlogs', middleware.authenticateToken,blogController.getAllBlogs);
router.get('/getBlogById', middleware.authenticateToken,blogController.getBlogById);
router.put('/updateBlog', middleware.authenticateToken,blogController.updateBlog);
router.delete('/deleteBlog',middleware.authenticateToken, blogController.deleteBlog);



module.exports = router;