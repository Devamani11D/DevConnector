import express from 'express';
import mongoose from 'mongoose';
import auth from '../../middleware/auth.js';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';


import {check,validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';

const router=express.Router();

//@route    GET api/profile/me
//@desc     gets profile of user
//@access   private
router.get('/me',auth,async (req,res)=>{
    try{
    const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
     
    if(!profile)
    {
        return res.status(400).send("No profile for this user");
    }
    res.json({profile});
    }catch(err)
    {
        return res.status(500).send("server error");
    }
})



//@route    POST api/profile
//@desc     create/update user profile
//@access   private

router.post('/',[auth,[
    check('status',"status is required").not().isEmpty(),
    check('skills',"skills is required!").not().isEmpty()
]],async (req,res)=>{
    const validation=validationResult(req);
    if(!validation.isEmpty())
    {
        return res.status(400).send(validation.array());
    }

    
    //Destructuring the object
    //spread the rest
    const {skills,company,website,youtube,twitter,facebook,linkedin,instagram,...rest}=req.body;
    
    let profileFields={
        user:req.user.id,
        company,
        website,
        skills:Array.isArray(skills)?skills:skills.split(',').map((skill)=>skill.trim()),
        ...rest
    };


    profileFields.social={youtube,twitter,facebook,instagram,linkedin};

    try{
        const hasProfile=await Profile.findOne({user:req.user.id});
        if(hasProfile)
        {
            //Update


            const profile=await Profile.findOneAndUpdate({user:req.user.id},{$set: profileFields},{new:true});
            return res.send(profile);
        }

        //create
        const profile=new Profile(profileFields);
        await profile.save();
        res.send(profile);

    }catch(err){
        console.error(err.message);
    }
    if(company)profileFields.company=company;
});

//@route    GET api/profile
//@desc     gets all profiles
//@access   public
router.get('/',async (req,res)=>{
    try{
    const profile=await Profile.find().populate('user',['name','avatar']);
     
    if(!profile)
    {
        return res.status(400).send("No profile");
    }
    res.json({profile});
    }catch(err)
    {
        return res.status(500).send("server error");
    }
})


//@route    GET api/profile/user/:user_id
//@desc     gets profile of user by userid
//@access   public
router.get('/user/:user_id',async (req,res)=>{
    try{
    const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
     
    if(!profile)
    {
        return res.status(400).send("No profile");
    }
    res.json({profile});
    }catch(err)
    {
        return res.status(500).send("server error");
    }
})


//@route    DELETE /api/profile
//@desc     removes user and profile
//@access   private
router.delete('/',auth,async (req,res)=>{
    try{
    await Profile.findOneAndRemove({user:req.user.id});
    await User.findOneAndRemove({_id:req.user.id});
    res.json({msg:"user removedd"});
    }catch(err)
    {
        return res.status(500).send("server error");
    }
})





export default router;