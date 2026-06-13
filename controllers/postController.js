 const Post = require("../model/postModel");

 exports.createPost = async(req,res) => {
    try{
        const {title, body} = req.body;
        const post = new Post({
            title, body,
        });
        const savedPost = await post.save();

        res.json({
            post: savedPost,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error: "Error while creating comment",
            message: error.message,
        });
    }
 };

 exports.getAllPosts = async(req, res) => {
    try{
        const posts = await Post.find().populate("likes").populate("comments");
        res.json({
            posts,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error: "Error while fetching posts",
            message: error.message,
        });
    }
 };