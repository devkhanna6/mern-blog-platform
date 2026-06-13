//Comment model will contain 3 parts - on which post comment is, who commented, what the comment is


//Import mongoose
const mongoose = require("mongoose");


//Route Handler
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,   //Imports post ID
        ref: "Post",   //Reference to Post Model
    },
    user: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});


//Export
module.exports = mongoose.model("Comment", commentSchema)  //Export commentSchema by the name of Comment.