import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({auth:{isAuthenticated,loading},logout}) => {
  const authLinks=(
    <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="#" onClick={logout}>
        <i class="fa-solid fa-right-from-bracket"></i>{' '}
        <span className='hide-sm'>LOGOUT</span></Link></li>
    </ul>
  );

  const guestLinks=(
    <ul>
        <li><Link to="/profile">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );


  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated? authLinks:guestLinks}</Fragment>)}
    </nav>
  )
}
Navbar.propTypes={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.bool.isRequired
}
const mapStateToProps=state=>({
  auth : state.auth
});
export default connect(mapStateToProps,{logout})(Navbar);
