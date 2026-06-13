//Import model
const Post = require("../model/postModel");
const Comment = require("../model/commentModel")

//Logic
exports.createComment = async(req, res) => {
    try{
        //Fetch data from req body
        const {post, user, body} = req.body;

        //create a comment object
        const comment = new Comment({
            post, user, body
        });

        //Save comment into database
        const savedComment = await comment.save();

        //We need to update the comment into the post's  comment array
        //Find the post by id and then add comment into array

        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, {new: true})   //{$push} is used to add into the array. New True is used to update it.
                            .populate("comments")           //Return the comments instead of the comment id
                            .exec();                         //Execute it

        res.json({
            post: updatedPost,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            error: "Error while creating comment",
            message: error.message,
        });
    }
};