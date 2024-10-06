const express = require("express");
const userModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
const accessMiddleware = require("../middleware/access.middleware");
const userRouter = express.Router();
var salt = bcrypt.genSaltSync(10);


userRouter.get('/users' , accessMiddleware(["Admin"]),  async (req,res) => {
    try {
        let user = await userModel.find()
        res.status(200).json({Msg : "User fetched Succesfully" , user})
    } catch (error) {
        res.send(error)
    }
})



userRouter.get('/users:id' , accessMiddleware(["Admin" , "User"]) ,  async (req,res) => {
    const {id} = req.params.id
    try {
        let user = await userModel.findOne({id})
        res.status(200).json({Msg : "User fetched succesfully" , user})
    } catch (error) {
        res.send("Error in user Fetched Details")
    }
})

userRouter.post("/register", async (req, res) => {
  let { username, password, name, role, email } = req.body;
  try {
    var hash = bcrypt.hashSync(password, salt);

    const user = new userModel({
      username,
      password: hash,
      name,
      email,
      role,
    });
    await user.save();
    res.status(200).json({ Msg: "User Created Successfully", user });
  } catch (error) {
    res.status(500).json({ Msg: "Error in creating user" });
  }
});



userRouter.post("/login", async (req, res) => {
  let { email, password, name } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.send("User not found Please register");
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      req.send("Enter valid Password");
    } else {
      var token = jwt.sign({ userId: user._id , role: user.role }, process.env.SECRET_KEY);
      res.status(200).json({ Msg: `${name} is logged in successfully` });
    }
  } catch (error) {
    res.status(500).json({ Msg: "Error in Login", error });
  }
});



userRouter.put('/user:id' ,accessMiddleware(["Admin" , "User"]),  async (req,res) => {
    try {
        let {id} = req.params.id
        let {name, email, password} = req.body
        let user = await userModel.findByIdAndUpdate({id, name,email,password})
        res.status(200).json({Msg : "User update succesfully" , user})
    } catch (error) {
        res.send("Error in update user")
    }
})

userRouter.delete('/user:id' , accessMiddleware(["Admin"]), async (req,res) => {
    try {
        let id = req.params.id
      
        let user = await userModel.findByIdAndUpdate(id)
        res.status(200).json({Msg : "User delete succesfully" , user})
    } catch (error) {
        res.send("Error in delete user")
    }
})

module.exports = userRouter;
