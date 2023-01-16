const express=require("express")
const cors=require("cors")
const { connection } = require("./Config/db")
const { userRouter } = require("./Router/User.route")
const { postRouter } = require("./Router/Post.route")
const { authentication } = require("./Middlewares/Authentication.middleware")


require("dotenv").config()


const app=express()
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("This is Social media page")
})

//Routers

app.use("/users",userRouter)
app.use(authentication)
app.use("/posts",postRouter)



app.listen(process.env.port, async()=>{

    try{
          await  connection
        console.log("Connected with Data Base")

    }catch(err){
        console.log({"Error":"Error is Coming while DB Connection"})
        console.log(err)
    }

    console.log(`Port is running on ${process.env.port}`)
})