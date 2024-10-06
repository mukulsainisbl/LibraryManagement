const express = require("express");
const accessMiddleware = require("../middleware/access.middleware");
const bookModel = require("../models/book.model");
const borrowingBooks = require("../models/borrowing.model");
const borrowingRouter = express.Router();

borrowingRouter.post(
  "/borrowings:id",
  accessMiddleware(["User"]),
  async (req, res) => {
    try {
      let id = req.params.id;
      let book = await bookModel.findById(id);

      if(!book){
    res.send("Book not Available")
      }else{
        let newBook = new borrowingBooks(req.body)
        await newBook.save()
        res.send("Book borrowed succesfully")
      }


    } catch (error) {
        res.send(error)
    }
  }
);

borrowingRouter.get('/borrowings' ,accessMiddleware(["Admin"]) , async (req,res) => {
let borrowboks = await  borrowingBooks.find()
res.json({Msg : "All books" ,  borrowboks})
})


borrowingRouter.put('/borrowings/:id/return' ,accessMiddleware(["Admin" , "User"]) , async (req,res) => {
    let returnBook = await bookModel.findById(id)
    if(!returnBook){
     return    res.send("Books are not Borrowed by you")
    } 
    })
    



module.exports = borrowingRouter;
