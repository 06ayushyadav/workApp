import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from 'path'

dotenv.config();
const app = express();

const _dirname=path.resolve();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                  
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));


dbConnection()
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Connection Failed:", error)); 

// Routes

app.use('/api', userRoutes, (req, res) => {
  console.log("User Route is working", req.body);
});

app.use(express.static(path.join(_dirname,"frontend/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
