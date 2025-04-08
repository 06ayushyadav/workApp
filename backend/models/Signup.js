import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    organization: { type: String },
    password: { type: String, required: true },
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    interns: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Intern"
        }
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skill"
        }
    ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
