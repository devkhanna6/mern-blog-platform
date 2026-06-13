const Post = require("../model/postModel");
const Like = require('../model/likeModel');

//Liking Post
exports.likePost = async(req, res) => {
    try{
        const {post, user} = req.body;
        const like = new Like({
            post, user,
        });
        const savedLike = await like.save();

        //Update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
                                      .populate("likes")
                                      .exec();

        res.json({
            post: updatedPost,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error: "Error while liking post",
            message: error.message,
        });
    }
}

exports.unlikePost = async(req, res) => {
    try{
        const {post, like} = req.body;

        //Find and delete the like
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});

        //Update the post collection after unliking
        const updatedPost = await Post.findByIdAndUpdate(post, 
                                                        {$pull: {likes: deletedLike._id}}, 
                                                        {new: true});
        
        res.json({
            post: updatedPost,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error: "Error while unliking post",
            message: error.message,
        });
    }
}


exports.dummyLink = (req, res) => {
    res.send("This is your dummy page");
}