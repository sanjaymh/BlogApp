const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment")

//To get all the comments of post with specific Id...
router.get("/comments/:id", commentController.getComments);
// Get comment by commentId...
router.get("/comment/:commentId", commentController.getCommentById);
//To add a comment to specific post...
router.put("/comment/:id", commentController.comment);
//To delete and edit post...
router.put("/comment-delete/:commentId",commentController.deleteComment)
router.put("/comment-edit/:commentId",commentController.editComment)

module.exports = router;