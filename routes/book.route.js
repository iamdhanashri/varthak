
const express=require("express")
const jwt=require("jsonwebtoken");
const {checkUserRole}=require("../middleware/checkuser.middleware")
const {apiLogger}=require("../middleware/logger.middleware")
const { authenticate } = require("../middleware/authenticate.middleware");
const { BookModel } = require("../model/book.model");

const bookRouter=express.Router()

// add book 

bookRouter.post("/books" , async (req, res) => {
    try {
    //   const { title, author } = req.body;
      const newBook = new BookModel(req.body);
      await newBook.save();
      res.send({"msg" : "Book created successfully"});
    } catch (e) {
        res.send({"msg" : "Book not created","error":e});
      
    }
  });


//   get book of perticular auther

bookRouter.get("/books", async (req, res) => {
    try {
      const books = await BookModel.find();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//   get all book 

bookRouter.get("/books/all", async (req, res) => {
    try {
      const books = await BookModel.find();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports={
    bookRouter
  }