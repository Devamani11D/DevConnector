import { setAlert } from "./alert";
import { PROFILE_ERR,GET_PROFILE,UPDATE_PROFILE } from "./types";
import axios from 'axios';
import { Navigate } from "react-router-dom";
const getProfileOfUser=()=>async dispatch=>{

    try{
    const res=await axios.get('/api/profile/me');

    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
    }catch(err){
        dispatch({
            type:PROFILE_ERR,
            payload:{msg:err.response, status:err.response.status}
        })
    }

}

//Create or update profile
export const createProfile=(formdata,edit=false)=>async dispatch=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'

            }
        }
        const res=await axios.post('/api/profile',formdata,config);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });

        dispatch(setAlert(edit?'Profile Updated' : 'Profile Created','success'));

        return <Navigate to='/dashboard'/>;
        // if(!edit){
        //     history.push('/dashboard');
        // }
    }catch(err){
        const errors=err.response.data;

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERR,
            payload:{msg:err.response, status:err.response.status}
        })
    }
}

//add experience
export const addExperience=(formdata)=>async dispatch=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'

            }
        }
        const res=await axios.put('/api/profile/experience',formdata,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert("Experience added",'success'));

        return <Navigate to='/dashboard'/>;
        // if(!edit){
        //     history.push('/dashboard');
        // }
    }catch(err){
        const errors=err.response.data.error;

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERR,
            payload:{msg:err.response, status:err.response.status}
        })
    }
}


//add education
export const addEducation=(formdata)=>async dispatch=>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'

            }
        }
        const res=await axios.put('/api/profile/education',formdata,config);

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        });

        dispatch(setAlert("Education added",'success'));

        return <Navigate to='/dashboard'/>;
        // if(!edit){
        //     history.push('/dashboard');
        // }
    }catch(err){
        const errors=err.response.data.error;

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERR,
            payload:{msg:err.response, status:err.response.status}
        })
    }
}

//Delete exp
export const deleteExp=(expid)=>async dispatch=>{
    try{
        console.log('inside del');
    const updatedProfile=await axios.delete(`/api/profile/experience/${expid}`);


    dispatch({
        type:UPDATE_PROFILE,
        payload:updatedProfile.data
    });

    dispatch(setAlert("Experience deleted"));
    }
    catch(err){
        dispatch({
            type:PROFILE_ERR,
            payload:{msg:err.response, status:err.response.status}
        })
    }
}
export default getProfileOfUser;