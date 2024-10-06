const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    username: {type: String, unique:true, required: true},
    password: {type:String, required:true},
    role: {type: String , enum:["Admin" , "Member" , "User"] , default: "Member"},
    name: {type:String, required:true},
    email:{type:String,required:true, unique:true},
    borrowedBooks: {type:mongoose.Schema.Types.ObjectId, ref: "Books"}


})

const userModel = mongoose.model("User" , UserSchema)

module.exports = userModel