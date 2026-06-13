//LikeModel -> who liked, on which post

const mongoose = require("mongoose");


//Route Handler
const LikeSchema = new mongoose.Schema({
    post: {
            type: mongoose.Schema.Types.ObjectId,   //Imports post ID
            ref: "Post",   //Reference to Post Model
        },
    user: {
            type: String,
            required: true,
    }
});

module.exports = mongoose.model("Like", LikeSchema); //Export by the name of Like