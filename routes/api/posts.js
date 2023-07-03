import express from 'express';
import { check,validationResult } from 'express-validator';
import mongoose from 'mongoose';
import auth from '../../middleware/auth.js';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';
import request from 'request';
import config from 'config';
import Post from '../../models/Posts.js';

const router=express.Router();


//@route    POST /api/posts/
//@desc     creates post by user
//@access   private
router.post('/',[auth,[
    check('text',"Cannot submit empty post").not().isEmpty()
]],async (req,res)=>{
    const validation=validationResult(req);
    if(!validation.isEmpty())
    {
        return res.status(400).send(validation.array());
    }
    try{
        const currUser=await User.findById(req.user.id);
        if(!currUser){
            return res.status(400).send("No user");
        }
        const newPost=new Post({
            user:req.user.id,
            text:req.body.text,
            name:currUser.name,
            avatar:currUser.avatar
        });
        await newPost.save();
        res.json(newPost);
    }catch(err)
    {
        return res.status(500).send(err.message);
    }
})

export default router;