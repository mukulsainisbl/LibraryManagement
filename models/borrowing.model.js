const mongoose = require('mongoose')
const BorrowingBooks = mongoose.Schema({
   book:{type:mongoose.Schema.Types.ObjectId, ref: "Books"},
   member: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
   borrowDate:{type:Date, default:Date.now()},
   returnDate:{type:Date, required:true},
   status: {type:String, enum:["Borrowed" , "Returned"] , default:"Borrowed"}

})

const borrowingBooks = mongoose.model("Borrowing" , BorrowingBooks)

module.exports = borrowingBooks