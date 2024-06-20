import {Request,Response} from 'express';
import User from '../models/user';


const getCurrentUser = async (req: Request, res: Response) => {
    try {
      const currentUser = await User.findOne({ _id: req.userId });
      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(currentUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
};

const createCurrentUser = async(req: Request,res: Response)=>{
    //1. check if the user already exists in the database
    //2. if the user does not exist, create a new user
    //3. send the user object back to the client

    try{
        const {auth0Id, email} = req.body;

        //1.
        const existingUser = await User.findOne({auth0Id}); //findOne is a mongoose method that will return the first document that matches the query

        if(existingUser){
            return res.status(200).send(); //200 is a success status
        }

        //2. if !existingUser
        const newUser = new User(req.body);
        await newUser.save(); //save is a mongoose method that will save the document to the database

        //3.
        res.status(201).json(newUser.toObject()); //201 is a created status

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error creating user"}); //500 is a server error 
    }
};

const updateCurrentUser = async(req: Request,res: Response)=>{
    try{
        const {name, addressLine1, country, city} = req.body; //destructure the request body
        const user = await User.findById(req.userId); //find the user by the id stored in the request object

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        //update the user object with the new values
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city; 
        user.country = country;

        await user.save(); //save the updated user to the database

        res.send(user); //send the updated user object back to the client
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error updating user"});
    }
};

export default {getCurrentUser,createCurrentUser,updateCurrentUser};