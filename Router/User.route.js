const express=require("express")
const { UserModel } = require("../Model/Users.model")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const bcrypt=require("bcrypt")


const userRouter=express.Router()



//register

userRouter.post("/register", async(req,res)=>{
      const {name,email,gender,password} =req.body

    try{
        //For Encrypting pass
        bcrypt.hash(password,5, async(err,newsecure_password)=>{
          
            //storing new password in db
            if(err){
                console.log(err)

            }else{
                const user=new UserModel({name,email,gender,password:newsecure_password})
                await user.save()
                res.send("You are Register")

            }


        })

    }catch(err){
        res.send({"Error":"Error While registring"})
        console.log(err)

    }

})


//Login Section

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await UserModel.find({email})
        const hashed_pass=user[0].password

        if(user.length>0){
            bcrypt.compare(password,hashed_pass,(err,result)=>{

                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"Msg":"Login Successful","token":token})
               
                }else{
                    res.send("Wrong Credentials")
                }
            })
        }else{
            res.send("Wrong Credentials")
        }


    }catch(err){
        res.send({"Error":"Error While Login"})
        console.log(err)

    }
})


module.exports={
    userRouter
}
