import "dotenv/config.js";
import http from "http"
import app from "./app.js"
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import projectModel from "./models/project.model.js";
import { generateResponse } from "./services/ai.service.js";

const port = process.env.PORT || 3000;

const server = http.createServer(app);


const io = new Server(server ,
    {
        cors: {
            origin: "*", // Change this in future
        },
    }
);

io.use(async (socket ,  next) => {

    try {

        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error("Invalid project ID"));
        }

        socket.project = await projectModel.findById(projectId);

        if (!token){
            return next(new Error("Authentication error"));
        }         

        const user = jwt.verify(token, process.env.JWT_SECRET);


        if (!user) return next(new Error("Authentication error"));

        socket.user = user;
        next();

    } catch (error) {
        next(error)        
    }

})

io.on('connection', socket => {

    socket.roomId = socket.project._id.toString();

    console.log('A user connected')

    socket.join(socket.roomId);

    socket.on('project-message' , async data =>{

        const message = data.message;

        const aiIsPresentInMessage = message.includes("@devAI") || message.includes("@devAi") || message.includes("@devai") || message.includes("@Devai");

        socket.broadcast.to(socket.roomId).emit('project-message', data);

        if(aiIsPresentInMessage){

            const prompt = message.replace(/@devAI|@devAi|@devai|@Devai/g, "").trim();
            const result = await generateResponse(prompt);

            io.to(socket.roomId).emit('project-message', {
                senderEmail: "DevAI",
                message: result
            });

            return;
        }


        // console.log('Message received on server:', data);

        
    })
    
    socket.on('disconnect', () => {
        console.log("User Disconnected");
        socket.leave(socket.roomId);        
    });
});





server.listen(port, ()=>{
    console.log((`Server is running on the port ${port}`));
    
})