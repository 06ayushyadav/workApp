import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    jobtitle: String,
    jobdescription: String,
    jobrole: String,
    jobsalary: String,
    jobtype: String,
    jobskill: String,
    joborganization: String,
    joblocation: String,
    jobform: String,
    jobvideo: String,
    joblastdate: String
});

export default mongoose.model("Job", jobSchema);
