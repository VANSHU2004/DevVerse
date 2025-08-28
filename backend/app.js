import express from "express";
import morgan from "morgan";
import connect from "./db/db.js"
import userRoutes from "./routes/user.routes.js"
import projectRoutes from "./routes/project.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";




connect();
const app = express();
// CORS configuration
const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "https://dev-verse-roan.vercel.app",
  "https://dev-verse-one.vercel.app",
  "https://dev-verse-weld.vercel.app",
  "https://dev-verse.vercel.app" // final production domain
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// to get logs of request

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/ai', aiRoutes);

// app.get("/", (req,res)=>{
//     res.send("Hello World")
// });

export default app;



