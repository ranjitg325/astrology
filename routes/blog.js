const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const middleware = require("../middleware/authenticateUser");


router.post('/blogCreate', middleware.authenticateToken,blogController.blogCreate);
router.get('/getAllBlogsOfOwn', middleware.authenticateToken,blogController.getAllBlogsOfOwn);
router.get('/getAllBlogs', middleware.authenticateToken,blogController.getAllBlogsCreated);
//router.get('/getBlogById', /*middleware.authenticateToken,*/blogController.getBlogById);
router.patch('/updateBlog/:id', middleware.authenticateToken,blogController.updateBlog);
router.delete('/deleteBlog/:id',middleware.authenticateToken, blogController.deleteBlog);



module.exports = router;