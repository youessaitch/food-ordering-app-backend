import mongoose from 'mongoose';

//we gonna store auth0Id db to our own DB
const userSchema = new mongoose.Schema({
    auth0Id:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String
    },
    addressLine1:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
});

const User = mongoose.model("User",userSchema);
export default User;