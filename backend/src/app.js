import express from "express"

import {createServer} from "node:http";

import {Server } from "socket.io"

import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import userRoutes from './routes/users.route.js'
import { connectToSocket } from "./controllers/socketManager.js";
dotenv.config();


const app=express()
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes);
const server=createServer(app);
const io=connectToSocket(server);
app.set("port",(process.env.PORT) || 8000)
app.get("/home",(req,res)=>{
    return res.json({"hello":"Wordl"});
})

const start= async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`MONGO connected DB host:${mongoose.connection.host}`)
    server.listen(app.get("port"),()=>{ console.log("listening on Port number 8000")})
   
}
start();