import React, { Fragment ,useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import { Link } from 'react-router-dom'

const AddEducation = ({addEducation}) => {
    const [FormData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        current:false,
        to:'',
        description:''

    })


    const {school,from,to,current,degree,fieldofstudy,description}=FormData;

    function onChange(e){
        const name=e.target.name;
        const value=e.target.value;
        setFormData({
            ...FormData,
            [name]:value
        })
    }
    function onSubmit(e){
        e.preventDefault();
        const newEdu=JSON.stringify(FormData);
        addEducation(newEdu);
    }

  return (
    <Fragment>
        <h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={(e)=>onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={(e)=>onChange(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            required
            onChange={(e)=>onChange(e)}
          />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study" onChange={(e)=>onChange(e)} name="fieldofstudy" value={fieldofstudy} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={(e)=>onChange(e)}/>
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" name="current" value={current} checked={current} onChange={(e)=>setFormData({...FormData,current:!current})}/> Current School or Bootcamp
          </p>
        </div>
        {!current && <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={(e)=>onChange(e)}/>
        </div>}
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            placeholder="Program Description"
            onChange={(e)=>onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired
}

export default connect(null,{addEducation})(AddEducation);
