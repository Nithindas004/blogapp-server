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

module.exports=router