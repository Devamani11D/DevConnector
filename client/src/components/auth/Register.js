import React ,{useState}from 'react';
import {connect} from 'react-redux';
import { Fragment } from 'react';
import {  setAlert} from '../../actions/alert';
import axios, { isAxiosError } from 'axios';
import {Link,Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { register } from '../../actions/auth';
const Register = ({setAlert,register,isAuthenticated}) => {
    const [formdata,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name,email,password,password2}=formdata;
    function handleChange(e){
        let name=e.target.name;
        let value=e.target.value;
        return setFormData({...formdata,[name]:value});
    }
    const OnSubmit=async (e)=>{
        e.preventDefault();
        if(password!==password2)
        {
            setAlert("Passwords do not match",'danger');
        }
        else{
            register({name,email,password});
            
        }
    }
    if(isAuthenticated)
    {
      <Navigate to="/dashboard"/>
    }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={OnSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange}/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6" value={password} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6" value={password2} onChange={handleChange}/>
        </div>
        <input type="submit" className="btn btn-primary" value="Register"/>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )


}
Register.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{setAlert,register})(Register);
