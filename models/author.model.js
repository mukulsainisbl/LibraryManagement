const mongoose = require('mongoose')
const AuthorSchema = mongoose.Schema({
    name:{type:String, required:true},
    biography: {type:String},
    dateOfBirth: {type:Date},
    nationality:String,
    books:{type: mongoose.Schema.Types.ObjectId, ref: "Books"}
 
})

const authorModel = mongoose.model("Author" , AuthorSchema)

module.exports = authorModel