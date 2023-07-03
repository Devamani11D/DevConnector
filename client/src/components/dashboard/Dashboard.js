import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link } from 'react-router-dom';
import Experience from './Experience';
import getProfileOfUser from '../../actions/profile';
import Dashboardactions from './Dashboardactions';
import { loadUser } from '../../actions/auth';
const Dashboard = ({getProfileOfUser,auth:{user},profileOb}) => {
    

    useEffect(()=>{
        
        getProfileOfUser()},[]);

    const {loading,profile}=profileOb;
  return (
    (!loading && profile!==null)? 
    (<Fragment>
        <h1>Welcome {user && user.name}</h1>
        <Dashboardactions/>
        <h2>wecode {profileOb.loading}</h2>
        
        <Experience experience={profile.experience}/>
    </Fragment>) :
    (<Fragment>
        <h1>Welcome {user && user.name}</h1>
        <p>You have not yet setup a profile,please add some info.</p>
        <Link to='/create-profile' className="btn btn-primary my-1">
            Create Profile
        </Link>
    </Fragment>)
  );
}

Dashboard.propTypes = {
    getProfileOfUser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
};
const mapStateToProps=state=>({
    auth:state.auth,
    profileOb:state.profile
});

export default connect(mapStateToProps,{getProfileOfUser})(Dashboard);
