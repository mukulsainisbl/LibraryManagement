const express = require('express')
const bookModel = require('../models/book.model')
const authMiddleware = require('../middleware/auth.middleware')
const accessMiddleware = require('../middleware/access.middleware')


const bookRouter = express.Router()

bookRouter.post('/books' , accessMiddleware,  async (req,res) => {
 try {

    let book = new bookModel(req.body)
    await book.save()
    res.status(200).json({Msg : "Books created Succesfully" , book})
 } catch (error) {
    res.send(error)
 }
})

bookRouter.get('/books:id' , async (req,res) => {
let id  = req.params.id
try {
    let book = bookModel.findById(id)
    res.json({Msg : book})

} catch (error) {
    res.send(error)
}

})

bookRouter.put('/books:id' ,accessMiddleware(["Admin"]), async (req,res) => {
    let id  = req.params.id
    try {
        let book = bookModel.findByIdAndUpdate(id , req.body ,{new:true})
        res.json({Msg : "Book update successfully" ,  book})
    
    } catch (error) {
        res.send(error)
    }
    
    })


    bookRouter.delete('/books:id' ,accessMiddleware(["Admin"]), async (req,res) => {
        let id  = req.params.id
        try {
            let book = bookModel.findByIdAndDelete(id)
            res.json({Msg : "Book Delete successfully" ,  book})
        
        } catch (error) {
            res.send(error)
        }
    
        })
    









module.exports = bookRouter