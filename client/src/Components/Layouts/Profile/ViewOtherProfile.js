import React,{useState,useEffect,Fragment} from 'react'
import classes from "./viewprofile.module.css";
import Navbar from "../Navbar/Navbar";
import {connect} from 'react-redux';
import p from "../../../assets/profilephoto.svg";
import {setloginprofile} from '../../../Actions/auth';
import axios from 'axios';
import PropTypes from 'prop-types';
const ViewOtherProfile = (props) => {
  const [btn, setbtn] = useState(
    <button onClick={e => follow(e)}>
      {" "}
      <i className="fas fa-plus"></i> Follow
    </button>
  );
  useEffect(() => {
    console.log(usr);
    if(usr.following.length===0){
         setbtn(
           <button onClick={e => follow(e)}>
             {" "}
             <i className="fas fa-plus"></i> Follow
           </button>
         );
    }
    usr.following.map(user => {
      if (user.user.toString() === profile.user.toString()) {
        return setbtn(
          <button onClick={e => Unfollow(e)}>
            {" "}
            <i className="fas fa-minus"></i> UnFollow
          </button>
        );
      }
    });
  }, []);
let profile = props.profile;
if (typeof profile === "string") {
  profile = JSON.parse(props.profile);
}
let image;
if (
  profile == null ||
  profile.profileimagetext == null ||
  profile.profileimagetext.length == 0
) {
  image = p;
} else {
  image = "/images/" + profile.profileimagetext;
}
let skill = [];
if (profile != null) {
  if (profile.skills != null && profile.skills.length > 0) {
    skill = profile.skills.split(",");
  }
}
let usr;
if(typeof(props.currnetuser)==='string'){
    usr = JSON.parse(props.currnetuser);
}
else{
    usr  = props.currnetuser;
}
const Unfollow = async (e) => {
    try {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    };
    const data = {};
    const url =
      "/api/v1/profile/unfollowuser/" + profile.user;
    const res = await axios.post(url,data,config);
    console.log(res);
    await props.setloginprofile();
    setbtn(
      <button onClick = {e => follow(e)}>
        {" "}
        <i className="fas fa-plus"></i> Follow
      </button>
    );

    } catch (error) {
        console.log(error);
    }
    
}
const follow = async e => {
     try {
       const config = {
         headers: {
           "x-auth-token": localStorage.getItem("token")
         }
       };
       const data = {};
       const url =
         "/api/v1/profile/followuser/" + profile.user;
       const res = await axios.post(url, data, config);
       console.log(res);
        await props.setloginprofile();
       setbtn(
         <button onClick={e => Unfollow(e)}>
           {" "}
           <i className="fas fa-plus"></i> UnFollow
         </button>
       );
     } catch (error) {
       console.log(error);
     }
}


if (profile != null) {
  return (
    <Fragment>
      <Navbar />
      <div className={"container " + classes["profile"]}>
        <div
          className={classes["profilepic"]}
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        <div className={classes["name"]}>
          <p>{profile.name}</p> 
          {btn}
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
} else {
  return (
    <Fragment>
      <Navbar />
      <p>There is no profile</p>
    </Fragment>
  );
}
}
ViewOtherProfile.propTypes = {
  setloginprofile:PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    profile:state.auth.viewprofile,
    currnetuser:state.auth.profile
});
export default connect(mapStateToProps, { setloginprofile })(ViewOtherProfile);