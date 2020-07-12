import React,{Fragment} from 'react'
import classes from './viewprofile.module.css';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PropTypes from'prop-types';
import p from '../../../assets/profilephoto.svg'
const ViewProfile = (props) =>  {
    let profile = props.profile
    if(typeof(profile)==='string'){
        profile = JSON.parse(props.profile);
    }
    let image;
    if(profile==null||profile.profileimagetext==null||profile.profileimagetext.length==0){
        image = p
    }
    else {
        image = 'http://localhost:5000/images/'+profile.profileimagetext;
    } 
    let skill = [];
    if(profile!=null){
      if(profile.skills!=null&&profile.skills.length > 0){
       skill = profile.skills.split(",");
      }
    }
    if(profile!=null){
    return (
      <Fragment>
          <Navbar/>
        <div className={"container " + classes["profile"]}>
          <div
            className={classes["profilepic"]}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className={classes["name"]}>
            <p>{profile.name}</p>{" "}
            <Link to="/editprofile">
              <button>
                {" "}
                <i className="fas fa-pen"></i> Edit profile
              </button>
            </Link>
          </div>
          <div className={classes["bio"]}>
            <p className={classes["p1"]}>Bio:</p>

            <p className={classes["p2"]}>{profile.bio}</p>
          </div>
          <div className={classes["role"]}>
            <p className={classes["p1"]}>Role</p>
            <p className={classes["p2"]}>{profile.role}</p>
          </div>
          <div className={classes["skills"]}>
            <p className={classes["p1"]}>Skills:</p>
            <ul>
              {skill.map(skill => {
                return <li>{skill}</li>;
              })}
            </ul>
          </div>
        </div>
      </Fragment>
    );
      }
      else{
       return (
         <Fragment>
           <Navbar/>
           <p>There is no profile</p>
         </Fragment>
       );
      }
}
ViewProfile.propTypes = {
    profile:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile:state.auth.profile
})
export default connect(mapStateToProps,{})(ViewProfile);