const express = require("express");
const authorModel = require("../models/author.model");
const authMiddleware = require("../middleware/auth.middleware");
const accessMiddleware = require("../middleware/access.middleware");
const authorRouter = express.Router();
authMiddleware

authorRouter.post("/authors", accessMiddleware(["Admin"]), async (req, res) => {
  try {
    let author = new authorModel(req.body);
    await author.save();
    res.status(200).json({ Msg: "Author created sucesfully", author });
  } catch (error) {
    res.status(500).json({ Msg: "Error in creating Author", error });
  }
});

authorRouter.get("/authors", async (req, res) => {
  try {
    let authors = await authorModel.find();
    res.status(200).json({ Msg: "All authors", authors });
  } catch (error) {
    res.send(error);
  }
});

authorRouter.get("/authors:id", async (req, res) => {
  let id  = req.params.id;
  try {
    let author = await authorModel.findById(id);
    res.status(200).json({ Msg: " author", author });
  } catch (error) {
    res.send(error);
  }
});

authorRouter.put("/authors:id", accessMiddleware(["Admin"]) , async (req, res) => {
  let id = req.params.id;
  
  try {
    let author = await authorModel.findByIdAndUpdate(id, req.body , {new:true});
    res.status(200).json({ Msg:  "Author" , author});
  } catch (error) {
    res.send(error);
  }
});


authorRouter.delete("/authors:id", accessMiddleware(["Admin"]), async (req, res) => {
    let id = req.params.id;
    
    try {
      let authors = await authorModel.findByIdAndDelete(id);
      res.status(200).json({ Msg: "Author Delete Successfully", authors });
    } catch (error) {
      res.send(error);
    }
  });
  



module.exports = authorRouter;
