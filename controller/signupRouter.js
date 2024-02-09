const express=require("express")
const signupModel=require("../models/userModel")

const router= express.Router()

router.post("/signup",async(req,res)=>{
    let data = req.body
    let signup=new signupModel(data)
    let result = await signup.save()
    res.json({
        status:"success"
    })
})

module.exports=router