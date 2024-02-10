const express = require("express")
const postModel = require("../models/postModel")

const router= express()

router.post("/add",async(req,res)=>{
    let data=req.body
    let postadd= new postModel(data)
    let result= await postadd.save()
    res.json({
        status:"success"
    })
})

router.get("/view",async(req,res)=>{
    let result=await postModel.find()
    .populate("userId","name age -_id")
    .exec()
    res.json(result)
})

router.post("/viewmypost",async(req,res)=>{
    let uid=req.body
    //console.log(uid)
    let result=await postModel.find(uid)
    //console.log(result)
    res.json(result)
})

module.exports=router