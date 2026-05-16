import { token } from "morgan"
import User from "../models/users.model.js"
import {hash } from "../utils/hash.js"
import jwt from "jsonwebtoken"

export const login = async (req, res)=>{
    const {username, password} = req.body
    const user = await User.findOne({username:username})
    const salt = user.password.substring(0,process.env.SALT_SIZE)
    const hashed = hash(password, salt)
    
    if(user.password === hashed){
        const token = jwt.sign({sub:user._id},process.env.JWT,{expiresIn:"1h"})
        res.json({login:true,msg:"OK",user:user, token:token})
    } else {
        res.status(404).json({login:false,msg:"wrong",user:{}, token:""})
    }
}