const mongoose = require('mongoose')
const BookSchema = mongoose.Schema({
  title: {type:String , required:true},
  ISBN:{type:String, unique:true, required:true},
  summary:{type:String},
  publicationDate:Date,
  geners:[{type:String}],
  copiesAvailable:{type:Number, default:1},
  author:{type: mongoose.Schema.Types.ObjectId , ref: "Author"},
  borrowedBy:[{type:mongoose.Schema.Types.ObjectId , ref: "User"}] 
})

const bookModel = mongoose.model("Books" , BookSchema)

module.exports = bookModel