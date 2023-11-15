
const express=require("express")

const bcrypt = require("bcrypt")

const jwt=require("jsonwebtoken")

const { UserModel } = require("../model/user.model")

const userRouter=express.Router()

// post 

userRouter.post("/register",(req,res)=>{
    const {name,email,pass,roles}=req.body
    try{
     bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.send({"msg":"User registration failed","error":err.message})
        }else{
            const user=new UserModel({name,email,pass:hash,roles})
            await user.save()
            res.status(201).send("User registration success")
        }
     })
    }
    catch(e){
        res.send("User registration failed")
    }
    })
    
    
    // login 
    
    userRouter.post("/login",async(req,res)=>{
        const {email,pass}=req.body
        try{
         const user=await UserModel.find({email})
         if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.status(201).send({msg:"Login success","token":token})
                }else{
            res.send("User login failed")
                    
                }
            })
         }else{
            res.send("Wrong credentials")
         }
        }
        catch(e){
            res.send({"msg":"something wrong","error":e.message})
        }
    })


    module.exports={
        userRouter
  
    }
    