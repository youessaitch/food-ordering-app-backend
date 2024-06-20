import express, {Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express(); //this will create an instance of express
app.use(cors()); 
app.use(express.json()); //this will allow us to parse json data from the API


//checking first api
// app.get("/test", async(req: Request,res: Response)=>{
//     res.json({message: "Hello!"})
// });

app.get("/health",async(req:Request, res:Response)=>{
  res.send({message: "health OK!"});
});


//*----------STEPS--------------
//*1.whenever /api/my/user is hit, the request will be forwarded to myUserRoute
//*2.myUserRoute will then forward the request to MyUserController
//*3.MyUserController will then handle the request and send back the response
//*4.the response will then be sent back to the client
//*5. the client will then be able to see the response
//*-----------------------------
app.use("/api/my/user", myUserRoute);

//listen: part of express; instructing the application to start a server and listen for incoming connections on port 7000
app.listen(7000,()=>{
    console.log("Server started on local host: 7000");
});








