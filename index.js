
const express=require("express");
const { authenticate } = require("./middleware/authenticate.middleware");
const {checkUserRole}=require("./middleware/checkuser.middleware");
const { dbConnection } = require("./config/db");
const { apiLogger } = require("./middleware/logger.middleware");
const { bookRouter } = require("./routes/book.route");
const { userRouter } = require("./routes/user.route");


const app=express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("homepage")
})

app.use("/user",userRouter)

app.use(authenticate)
app.use(apiLogger)
app.use(checkUserRole)

app.use("/book",bookRouter)

app.listen(8080,async()=>{
    try{
   await dbConnection
   console.log("connected to db")
    }
    catch(e){
        console.log(e.message)
    }
    console.log("listening port at 8080")
})