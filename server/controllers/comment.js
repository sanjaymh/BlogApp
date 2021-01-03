const Post = require("../models/post");

exports.comment = async function (req, res, next) {
    const postId = req.params.id;
    const newComment = req.body;
    
    try {
        await Post.findOneAndUpdate({_id: postId}, {"$push": {"comments": newComment }});
        res.status(201).json({success: true});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.getCommentById = async (req, res, next) => {
    const { commentId } = req.params;
    try {
        const commentObj = await Post.findOne({"comments._id": commentId})
        .select({"comments":{"$elemMatch":{"_id":commentId}}}).select("-_id")
        const comment = await commentObj.comments[0];
        res.status(201).json({comment});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.getComments = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const data = await Post.findOne({_id:postId}).select("comments").select("-_id");
        res.status(201).json({data});
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

exports.editComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { title, description } = req.body;
    try{
    await Post.findOneAndUpdate({"comments._id":commentId}, {
        "$set":{"comments.$.title":title, "comments.$.description":description}
    }).select("comments").select("_id");
        res.status(201).json({success: true});
    }catch(error) {
        error.status = 400;
        next(error);
    }
}

exports.deleteComment = async(req, res, next) => {
    const { commentId } = req.params;
    
    try{
    Post.findOneAndUpdate({ "comments._id":commentId },{
        "$pull": {"comments":{"_id":commentId}}
    }, {new: true}).then( () => res.status(201).json({success:true}));
    }catch (error) {
        error.status = 400;
        next(error);
    }
}