require('dotenv').config()
const express = require('express')
const connection = require('./config/db')
const userRouter = require('./routes/user.routes')
const accessMiddleware = require('./middleware/access.middleware')
const authorRouter = require('./routes/author.routes')
const bookRouter = require('./routes/books.routes')
const authMiddleware = require('./middleware/auth.middleware')
const app = express()
app.use(express.json())
const PORT = process.env.PORT


app.get('/health-route' , (req,res) => {
    res.send("Server is running fine")
})


app.use('/user',authMiddleware ,  userRouter )

app.use("/author" , authMiddleware , authorRouter)

app.use("/book"  ,authMiddleware , bookRouter )


app.listen(PORT,async () => {
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
        
    }
    console.log(`server is listen on ${PORT}`)
})