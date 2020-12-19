import React, { Fragment, useState, useEffect } from "react";
import classes from "./prepost.module.css";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { setsinglepost, setpost } from "../../../Actions/post";
import { setusrprofileid } from "../../../Actions/auth";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
const Prepost = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.setpost();
  }, []);

  const ViewOtherProfile = async (e, id) => {
    await props.setusrprofileid(id);
    history.push("/viewuserprofile");
  };
  const read = async (e, post) => {
    e.preventDefault();
    await props.setsinglepost(post._id);
    history.push("/post");
  };

  //Function to remove HTML TAGS from a string
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }
  //If props is not empty then render this
  if (props.post.length > 0) {
    return (
      <Fragment>
        <div className="container" style={{ marginTop: "60px" }}>
          <Link to="/createpost">
            <button className={classes["btn"]}>
              <i
                className="fas fa-plus-circle"
                style={{ color: "#720F0F" }}
              ></i>{" "}
              New post
            </button>
          </Link>
        </div>
        {props.post.map((post) => {
          const html = window.atob(post.posttext).toString().substring(0,25);
          const txt = removeTags(html);
          const photo = "/images/" + post.createrpic;
          console.log(`url(${photo})`);
          return (
            <Fragment>
              <div className={"container " + classes["post"]}>
                <div className={classes["heading"]}>
                  <p>{post.heading}</p>
                </div>
                <div className={classes["details"]}>
                  <div className={classes["name"]}>
                    <button
                      className={classes["btn2"]}
                      onClick={(e) => ViewOtherProfile(e, post.user)}
                    >
                      {" "}
                      <i className="fas fa-pen"></i>
                      {post.name}
                    </button>
                  </div>
                  <div className={classes["created"]}>
                    <p>{post.createdAt.toString()}</p>
                  </div>
                </div>
                <div
                  className={classes["photo"]}
                  style={{ backgroundImage: `url(${photo})` }}
                ></div>
                <div className={classes["text"]}>
                  <div className={classes["txt"]}>
                    <p>{txt}.......</p>
                  </div>
                  <button
                    className={classes["full"]}
                    onClick={(e) => read(e, post)}
                  >
                    Read full post
                  </button>
                </div>
                <div className={classes["lnc"]}>
                  <div className={classes["likes"]}>
                    <p>
                      {" "}
                      {
                        post.likes.length
                      } <i className="fas fa-thumbs-up"></i>{" "}
                    </p>
                  </div>
                  <div className={classes["comments"]}>
                    {" "}
                    {post.comments.length} <i className="fas fa-comments"></i>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
  //If the props object is empty then render this
  else {
    return (
      <Fragment>
        <div className="container" style={{ marginTop: "60px" }}>
          <Link to="/createpost">
            <button className={classes["btn"]}>
              <i
                className="fas fa-plus-circle"
                style={{ color: "#720F0F" }}
              ></i>{" "}
              New post
            </button>
          </Link>
        </div>
        <div className={"container " + classes["no"]}>
          <p>No posts yet</p>
          <p>Follow people to see their posts</p>
        </div>
      </Fragment>
    );
  }
};
Prepost.propTypes = {
  token: PropTypes.string.isRequired,
  setsinglepost: PropTypes.func.isRequired,
  setpost: PropTypes.func.isRequired,
  setusrprofileid: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
  post: state.post.posts,
});

export default connect(mapStateToProps, {
  setsinglepost,
  setpost,
  setusrprofileid,
})(Prepost);
