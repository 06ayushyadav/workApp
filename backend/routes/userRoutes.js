
import express from "express";
import dotenv from "dotenv";
import user from "../models/Signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import job from '../models/Job.js';
import skill from '../models/Course.js';
import intern from '../models/Intern.js';

import upload from '../config/multerConfig.js'

import isLoggedIn from "../middleware/isLogedIn.js";

dotenv.config();
const router = express.Router();
const secret = process.env.SECRET || "defaultsecret";

// router.use(cookieParser());

router.post('/signup', async (req, res) => {
    const { username, email, organization, password } = req.body;

    try {

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ message: "Error generating salt" });

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).json({ message: "Error hashing password" });

                try {
                    const createUser = await user.create({
                        username,
                        email,
                        organization,
                        password: hash
                    });

                    const token = jwt.sign({ email }, secret, { expiresIn: "7d" });

                    res.cookie("token", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "Lax"
                    });

                    res.status(201).json({ message: "Signup successful", user: createUser });

                } catch (error) {
                    res.status(500).json({ message: "Database error", error: error.message });
                }
            });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ email: existingUser.email }, secret, { expiresIn: "7d" });


        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  // HTTPS 
            sameSite: "Lax"
        });
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.get('/logout', (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: false,  // HTTPS 
        sameSite: "Lax",
        expires: new Date(0)
    });

    res.status(200).json({ message: "Logout successful" });
});


// job posting route

router.post('/upload-job', isLoggedIn, upload.fields([{ name: "jobposter", maxCount: 1 }]), async (req, res) => {
    try {
        const { jobtitle, jobdescription, jobrole, jobsalary, jobtype, jobskill, jobform, joborganization,
            joblocation,
            jobvideo,
            joblastdate,
        } = req.body;

        const poster = req.files?.jobPoster ? req.files.jobPoster[0].path : null;

        const currentUser = req.user; // 
        if (!currentUser) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const newJob = await job.create({
            user: currentUser._id,
            jobtitle, jobdescription, jobrole, jobsalary, jobtype, jobskill, jobform, joborganization,
            joblocation,
            jobvideo,
            joblastdate,

        });

        currentUser.jobs.push(newJob._id);
        await currentUser.save();
        // console.log(newJob)
        res.status(201).json({ success: true, message: "Job posted successfully!", job: newJob });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
);

router.get('/upload-job', async (req, res) => {
    try {
        const jobs = await job.find();
        res.json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


router.delete("/delete/:id", isLoggedIn, async (req, res) => {
    try {
        const jobId = req.params.id;

        const currentUser = req.user;

        const foundJob = await job.findById(jobId);
        if (!foundJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (String(foundJob.user) !== String(currentUser._id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await job.findByIdAndDelete(jobId);

        currentUser.jobs = currentUser.jobs.filter(j => String(j) !== jobId);
        await currentUser.save();

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.log("Delete Job Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


router.get("/upload-job/:id", async (req, res) => {

    const { id } = req.params;
    console.log("🔥 Job ID received:", id);
    try {
        const jobData = await job.findById(id);
        if (!jobData) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, job: jobData });
    } catch (err) {
        console.error("Fetch job by ID error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});



// intern router

router.post('/upload-internship', isLoggedIn, upload.fields([{ name: "jobposter", maxCount: 1 }]), async (req, res) => {
    
    try {
        const { interntitle, interndescription, internrole, internsalary, interntype, internskill, internform, internorganization, internlocation, internvideo, internlastdate } = req.body;

        const poster = req.files?.jobPoster ? req.files.jobPoster[0].path : null;

        const currentUser = req.user; 

        if (!currentUser) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const newIntern = await intern.create({
            user: currentUser._id,
            interntitle, interndescription, internrole, internsalary, interntype, internskill, internform, internorganization,
            internlocation,
            internvideo,
            internlastdate,

        });

        currentUser.interns.push(newIntern._id);
        await currentUser.save();
        // console.log(newIntern)
        res.status(201).json({ success: true, message: "Internship posted successfully!", internship: newIntern });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

}
);

router.get('/upload-internship', async (req, res) => {
    try {
        const internships = await intern.find();
        res.json({ success: true, interns: internships });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}); 

router.delete("/delete-internship/:id", isLoggedIn, async (req, res) => {
    try{
        const internshipId = req.params.id;
        const currentUser = req.user;
        const foundInternship = await intern.findById(internshipId);
        if (!foundInternship) {
            return res.status(404).json({ message: "Internship not found" });
        }
        if(String(foundInternship.user) !== String(currentUser._id)){
            return res.status(403).json({ message: "Unauthorized" });
        }
        currentUser.interns=currentUser.interns.filter(i=>String(i)!==internshipId)
        await currentUser.save();
        await intern.findByIdAndDelete(internshipId);
        res.status(200).json({ message: "Internship deleted successfully" });
    }catch(error){  
        console.log("Delete Internship Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
})

router.get("/upload-internship/:id", async (req, res) => {
    const {id}=req.params;
    console.log("🔥 Internship ID received:", id);
    try {
        const internshipData = await intern.findById(id);
        if (!internshipData) {
            return res.status(404).json({ success: false, message: "Internship not found" });
        }
        res.status(200).json({ success: true, intern: internshipData });
    } catch (err) {
        console.error("Fetch internship by ID error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


// course routes
router.post('/upload-skill', isLoggedIn, upload.fields([{ name: "jobposter", maxCount: 1 }]), async (req, res) => {
    try {
        const { skilltitle, skilldescription, skillvideo } = req.body;

        const poster = req.files?.jobPoster ? req.files.jobPoster[0].path : null;

        const currentUser = req.user; 

        if (!currentUser) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const newSkill = await skill.create({
            user: currentUser._id,
            skilltitle, skilldescription,skillvideo,
        });

        currentUser.skills.push(newSkill._id);
        await currentUser.save();
        // console.log(newSkill)
        res.status(201).json({ success: true, message: "Skill posted successfully!", skills: newSkill });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

router.get('/upload-skill', async (req, res) => {
    try {
        const skills = await skill.find();
        res.json({ success: true, skills });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

router.delete('/delete-skill/:id', isLoggedIn, async (req, res) => {

    try {
        const skillId = req.params.id;

        const currentUser = req.user;
        const foundSkill = await skill.findById(skillId);

        if (!foundSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }
        if (String(foundSkill.user) !== String(currentUser._id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        currentUser.skills = currentUser.skills.filter(s => String(s) !== skillId);
        await currentUser.save();
        await skill.findByIdAndDelete(skillId);
        res.status(200).json({ message: "Skill deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
});

router.get('/upload-skill/:id', async(req,res)=>{
    const{id}=req.params;
    try{
        const skillData =await skill.findById(id);
        if(!skillData){
            return res.status(404).json({success:false,message:"Skill not found"});
        }
        res.status(200).json({success:true,skill:skillData});


    }catch(err){
        console.error("Fetch skill by ID error:", err);
        res.status(500).json({success:false,message:"Server Error"});
    }
})


export default router;

