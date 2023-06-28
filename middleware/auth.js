import jwt from 'jsonwebtoken';
import config from 'config';
const auth = (req,res,next)=>
{
    
    const token=req.header('x-auth-token');
    if(!token)
    {
       return res.send("no token,authentication denied");
    }
    try{
    const decoded=jwt.verify(token,config.get('jwtSecret'));
    
    req.user=decoded.user;
    next();
    }
    catch(err){
        res.status(401).send(err.message);
    }
    
}
export default auth;