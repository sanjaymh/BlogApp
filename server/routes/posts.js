const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');

router.route('/post')
    .get(postController.getAllPosts)
    .post(postController.postPost)

router.route('/post/:postId')
    .get(postController.getPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);

router.post

module.exports = router;