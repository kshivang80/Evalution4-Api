const express=require("express")
const { PostModel} =require("../Model/Post.model")


const postRouter=express.Router()


postRouter.get("/",async(req,res)=>{
    let queryData=req.query

    try{
        const post= await PostModel.find(queryData)
        res.send(post)

    }catch(err){
        console.log(err)
        console.log({"Error":"Error While Get Request"})

    }
})

// POST REQUEST


postRouter.post("/create",async(req,res)=>{
      let data=req.body

      try{
        //For adding in to database
        const new_post=new PostModel(data)
        await new_post.save()
        res.send("Post Data is added  Successfully")

      }catch(err){

        console.log(err)
        console.log({"Error":"Error While Post Request"})


      }

})


// Patch REQUEST

postRouter.patch("/update/:id",async(req,res)=>{

    const ID=req.params.id
    const payload=req.body

    //For finding ID
    const post =await PostModel.findOne({_id:ID})
    console.log(post,"post user id")
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID


    try{
        if(userID_making_req !==userID_in_post){
            res.send({"Msg":"You are not authorized person"})

        }else{
            await PostModel.findByIdAndUpdate({_id:ID},payload)
            res.send(`updated the Post whose ID is ${ID}`)
        }

    }catch(err){
        console.log(err)
        console.log({"Error":"Error While Patch Request"})

    }
})



// DELETE REQUEST

postRouter.delete("/delete/:id",async(req,res)=>{

    const ID=req.params.id
    //const payload=req.body

    //For finding ID
    const post =await PostModel.findOne({_id:ID})
    console.log(post,"post user id")
    const userID_in_post=post.userID
    const userID_making_req=req.body.userID


    try{
        if(userID_making_req !==userID_in_post){
            res.send({"Msg":"You are not authorized person"})

        }else{
            await PostModel.findByIdAndDelete({_id:ID})
            res.send(`delete the Post whose ID is ${ID}`)
        }

    }catch(err){
        console.log(err)
        console.log({"Error":"Error While delete Request"})

    }
})



module.exports={
    postRouter
}

