import express from 'express';
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check,validationResult } from 'express-validator';
const router=express.Router();

//@route    /api/auth
//@desc     authentication middleware and logs user
//@access   /private
router.get('/',auth,async(req,res)=>{
    try{
    const user=await User.findById(req.user.id);
    res.json(user);
    }catch(err)
    {
        res.status(500).send(err.message);
    }


})


//@route    Post /
//@desc     sign in user
//@access   private(returns token);
router.post('/',[
    check('email',"Please enter valid email").isEmail(),
    check('password',"Minimum length of 6 character password").exists()
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        //see if user exists
        const {email,password}=req.body;
        let user=await User.findOne({email});
        if(!user)
        {
            return res.status(500).send("Invalid Credentials!");
        }


        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(500).send("Incorrect Password!");
        }
        //jwt
        const payload={
            user:{
                id:user.id
            }
        };

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>
        {
            if(err) throw err;
            res.json({token:[token]});
        })

    }
    catch(err)
    {
        return res.status(400).json([{error : err.message}]);
    }

})

export default router;