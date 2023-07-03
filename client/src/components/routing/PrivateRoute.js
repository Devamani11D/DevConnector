import React from 'react'
import PropTypes from 'prop-types'
import {Route,Navigate} from 'react-router-dom';
import { connect } from 'react-redux'
const PrivateRoute = ({element:Element,auth:{isAuthenticated,loading},...rest}) => {
  // console.log(element);

  <Route {...rest} render={props=> true && !loading ? (<Navigate to="/login"/>) : (<Element {...props}/>)} />
}

PrivateRoute.propTypes = {
auth:PropTypes.object.isRequired
}


const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps)(PrivateRoute);
