const express=require("express")
const signupModel=require("../models/userModel")
const bcrypt = require("bcryptjs")

const router= express.Router()

hashPasswordGenerator= async(pass)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

router.post("/signup",async(req,res)=>{
    let {data} = {"data":req.body}
    let password= data.password
    hashPasswordGenerator(password).then(
        (hashedPassword)=>{
            console.log(hashedPassword)
            data.password=hashedPassword
            let signup=new signupModel(data)
            let result = signup.save()
            res.json({
                status:"success"
            })
        }
    ) 
})


router.post("/signin",async(req,res)=>{
    let input = req.body
    let eMail=req.body.email
    let epass=req.body.password
    let data = await signupModel.findOne({"email":eMail})
    // console.log(input)
    if(!data)
    {
        return res.json(
            {
                status:"invalid user"
            }
        )
    }
    let dbpass=data.password
    const match=await bcrypt.compare(epass,dbpass)
    if(!match)
    {
        return res.json(
            {
                status:"incorrect password"
            }
        )
    }
    res.json(
        {
            status:"success","userdata":data
        }
    )
})

module.exports=router