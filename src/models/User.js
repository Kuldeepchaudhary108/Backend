import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    FullName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    }, 
    password:{
        type:String,
        required: true,
    },
    role:{
        type: String,
        default: 'participant',
        enum: ['participant', 'admin'], 
    },
 
},{timestamps:true})

const UserModel = mongoose.model("User" , UserSchema)

export default UserModel