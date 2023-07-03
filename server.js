import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import UserRoute from './routes/api/users.js';
import PostRoute from './routes/api/posts.js';
import AuthRoute from './routes/api/auth.js';
import ProfileRoute from './routes/api/profile.js';
const app=express();

//Database Call
connectDB();
const port=process.env.PORT || 5500;

//similar to bodyparser to get req.body
app.use(express.json({extended:false}));
app.use(cors());
app.get('/',(req,res)=>
{
    res.send("API running");
})

app.use('/api/users',UserRoute);
app.use('/api/posts',PostRoute);
app.use('/api/profile',ProfileRoute);
app.use('/api/auth',AuthRoute);
app.listen(port,()=>{
    console.log(`App listening at port ${port}`);
})