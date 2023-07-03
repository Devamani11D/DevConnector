
import './App.css';
// import { BrowerRouter as Router,Route,Switch} from 'react-router-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import React,{Fragment,useEffect} from 'react';
import {loadUser } from './actions/auth';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile/EditProfile';
import ProfileCreate from './components/profile/ProfileCreate';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
// import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
function App() {
  useEffect(()=>
  {
    store.dispatch(loadUser());
  },[]);


  return (
    <Provider store={store}>
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={< Landing />}></Route>
        </Routes>
        <section className='container'>
        <Alert/>
        {/* <PrivateRoute exact path='/dashboard' element={<Dashboard/>}></PrivateRoute> */}
          <Routes>

            <Route exact path='/register' element={< Register/>}></Route>
            <Route exact path='/login' element={< Login/>}></Route>
            {/* <Route exact path='/dashboard' element={<PrivateRoute/>}> */}
            <Route exact path='/dashboard' element={<Dashboard/>}></Route>
            <Route exact path='/create-profile' element={<ProfileCreate/>}></Route>
            <Route exact path='/edit-profile' element={<EditProfile/>}></Route>
            

            
          </Routes>
          <Routes>
          <Route exact path='/add-experience' element={<AddExperience/>}></Route>
          <Route exact path='/add-education' element={<AddEducation/>}></Route>
          </Routes>
        </section>
        </div>
    </Router>
    </Provider>
  );
}

export default App;
