import Comment from "../Models/comment.js"

export const newComment = async (req, res) => {
    try {
        const comment = await new Comment(req.body);
        comment.save();
        return res.status(200).json({ msg: "Comment saved Successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id });
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const deleteComment = async(req, res)=> {
    try {
        const comment = await Comment.findById(req.params.id);
        await Comment.findByIdAndDelete(comment._id);
        return res.status(200).json({msg:"comment deleted successfully"});
    } catch (error) {
        return res.status(500).json({msg:error.message});
    }
}