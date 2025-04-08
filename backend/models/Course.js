import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    skilltitle: String,
    skilldescription: String,
    skillvideo: String,
});

export default mongoose.model("Skill", skillSchema);
