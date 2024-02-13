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
router.post("/delete",async(req,res)=>{
    let input=req.body
    let response=await postModel.deleteOne(input)
    res.json({
        status:"success"
    })
})

module.exports=router