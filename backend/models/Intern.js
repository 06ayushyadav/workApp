import mongoose from "mongoose";

const internSchema =new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    
    interntitle:String,
    internorganization:String,
    internlocation:String,
    internform:String,
    internvideo:String,
    internlastdate:String,
    interndescription:String,
    internrole:String,
    interntype:String,
    internskill:String,
    internsalary:String,

})

export default mongoose.model("Intern", internSchema);