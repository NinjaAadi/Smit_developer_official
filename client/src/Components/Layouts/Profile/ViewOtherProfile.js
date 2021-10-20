import React, { useState, useEffect, Fragment } from "react";
import classes from "./viewprofile.module.css";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import p from "../../../assets/profilephoto.svg";
import { setloginprofile } from "../../../Actions/auth";
import axios from "axios";
import PropTypes from "prop-types";
const ViewOtherProfile = (props) => {
  const [btn, setbtn] = useState("follow");
  useEffect(() => {
    usr.following.map((user) => {
      if (user.user.toString() === profile.user.toString()) {
        return setbtn("unfollow");
      }
    });
  }, []);
  let profile = props.profile;
  if (typeof profile === "string") {
    console.log(profile);
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
  if (typeof props.currnetuser === "string") {
    usr = JSON.parse(props.currnetuser);
  } else {
    usr = props.currnetuser;
  }
  const decide = (e) => {
    if (btn === "follow") {
      follow();
    } else if (btn === "unfollow") {
      Unfollow();
    }
  };
  const Unfollow = async () => {
    console.log("Clicking here");
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const data = {};
      const url = "/api/v1/profile/unfollowuser/" + profile.user;
      console.log(url);
      const res = await axios.post(url, data, config);
      console.log(res);
      setbtn("follow");
      await props.setloginprofile();
    } catch (error) {
      console.log(error);
    }
  };
  const follow = async (e) => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const data = {};
      const url = "/api/v1/profile/followuser/" + profile.user;
      const res = await axios.post(url, data, config);
      console.log(res);
      await props.setloginprofile();
      setbtn("unfollow");
    } catch (error) {
      console.log(error);
    }
  };
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  if (profile != null) {
    return (
      <Fragment>
        <Navbar />
        <div className={classes["profile"]}>
          <div className={classes["top"]}>
            <div className={classes["name"]}>
              <h1>{profile.name}</h1>
            </div>
            <div className={classes["photo"]}>
              <div
                className={classes["profile-photo"]}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          </div>
          <button className={classes["fnf"]} onClick={(e) => decide(e)}>
            {" "}
            {btn}
          </button>
          <p className={classes.heading + " " + classes.res}>Bio :</p>
          <p className={classes[("bio", "res")]}>{profile.bio}</p>
          <p className={classes.heading + " " + classes.res}>Role :</p>
          <p className={classes[("bio", "res")]}>{profile.role}</p>
          <p className={classes.heading + " " + classes.res}>Skills :</p>
          <div className={classes["skills"] + " " + classes["res"]}>
            {skill.map((skill) => {
              return (
                <p className={classes["skill-item"]}>{capitalize(skill)}</p>
              );
            })}
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
};
ViewOtherProfile.propTypes = {
  setloginprofile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.auth.viewprofile,
  currnetuser: state.auth.profile,
});
export default connect(mapStateToProps, { setloginprofile })(ViewOtherProfile);
