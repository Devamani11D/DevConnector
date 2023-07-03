import express from 'express';
import mongoose from 'mongoose';
import auth from '../../middleware/auth.js';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';
import request from 'request';
import config from 'config';

import {check,validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import profile from '../../models/Profile.js';

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
    res.send(profile);
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
    res.send(profile);
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
    res.send(profile);
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

//@route    PUT /api/profile/experience
//@desc     updates profile experiende
//@access   private

router.put('/experience',[auth,[
    check('title',"title is required").not().isEmpty(),
    check('company',"comppany field is required").not().isEmpty(),
    check('from',"from date is required").not().isEmpty()
]],async (req,res)=>{
    let error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({error:error.array()});
    }
    const {company,title,from,...rest}=req.body;
    const newExp={
        company,
        title,
        from,
        ...rest
    };
    try{
    // let profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:{exprerience:newExp}});
    
    let profile=await Profile.findOne({user:req.user.id});
    if(!profile)
    {
        return res.status(400).send("No profile");
    }
    profile.experience.push(newExp);
    await profile.save();
    
    res.send(profile);
    }
    catch(err){
        return res.status(500).send("server error");
    }
})



//@route    DELETE /api/profile/experience/:exp_id
//@desc     removes profile experiende of user
//@access   private
router.delete('/experience/:exp_id',[auth],async (req,res)=>
{
    try{
        let profile=await Profile.findOne({user:req.user.id});
        let index=profile.experience.map(singleexp=>singleexp.id).indexOf(req.params.exp_id);
        profile.experience.splice(index,1);
        await profile.save();
        res.send(profile);
    }catch(err)
    {

        return res.status(500).send(err.message);
    }

})


//@route    PUT /api/profile/education
//@desc     updates profile education
//@access   private
router.put('/education',[auth,[
    check('school',"school is required").not().isEmpty(),
    check('degree',"degree field is required").not().isEmpty(),
    check('from',"from date is required").not().isEmpty()
]],async (req,res)=>{
    let error=validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({error:error.array()});
    }
    const {school,degree,from,...rest}=req.body;
    const newEdu={
        school,
        degree,
        from,
        ...rest
    };
    try{
    // let profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:{exprerience:newExp}});
    let profile=await Profile.findOne({user:req.user.id});
    if(!profile)
    {
        return res.status(400).send("No profile");
    }
    profile.education.push(newEdu);
    await profile.save();
    res.send(profile);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
})

//@route    DELETE /api/profile/education/:edu_id
//@desc     removes profile education fields of user
//@access   private
router.delete('/education/:edu_id',[auth],async (req,res)=>
{
    try{
        let profile=await Profile.findOne({user:req.user.id});
        let index=profile.experience.map(singleedu=>singleedu.id).indexOf(req.params.edu_id);
        profile.education.splice(index,1);
        await profile.save();
        res.send(profile);
    }catch(err)
    {

        return res.status(500).send(err.message);
    }

})

router.get('/github/:username',async (req,res)=>
{
    try{
        const options={
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        };

        request(options,(error,response,body)=>{

            if(error){
                console.error(error);

            }
            if(response.statusCode!== 200)
            {

                return res.status(400).json({msg:"no github profile found"});
            }
            res.json(JSON.parse(body));
        })
    }catch(err){
        return res.status(400).send(err.message);
    }
})

export default router;