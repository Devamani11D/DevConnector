import React from 'react'
import PropTypes from 'prop-types'
import {Route,Navigate, Outlet} from 'react-router-dom';
import { connect } from 'react-redux'
const PrivateRoute = ({isAuthenticated}) => {
  // console.log(element);

  isAuthenticated?<Outlet/>:<Navigate to='/login'/>
}

PrivateRoute.propTypes = {
isAuthenticated:PropTypes.bool.isRequired
}


const mapStateToProps=state=>({
    auth:state.auth.isAuthenticated
})
export default connect(mapStateToProps)(PrivateRoute);
