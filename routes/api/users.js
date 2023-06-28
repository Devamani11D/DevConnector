import express from 'express';
import User from '../../models/User.js';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { check,validationResult } from 'express-validator';

const router=express.Router();

//@route POST
//@access Public
router.post('/',[
    check('name',"Name is required.").not().isEmpty(),
    check('email',"Please enter valid email").isEmail(),
    check('password',"Minimum length of 6 character password").isLength({min:8})
],
async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        //see if user exists
        const {name,email,password}=req.body;
        let user=await User.findOne({email});
        if(user)
        {
            return res.status(500).send("User Already exists!");
        }


        //gravatar
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'404'
        });

        //add data to database
        user=new User({
            name,
            email,
            password,
            avatar
        });

        //password encryption
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);

        //save data
        await user.save();
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



    // res.send("user Route");
})

export default router;