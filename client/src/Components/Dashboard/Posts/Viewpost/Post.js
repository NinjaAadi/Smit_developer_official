import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getsinglepost } from "../../../../Actions/post";
import PropTypes from "prop-types";
import classes from "./post.module.css";
import axios from "axios";
import Spinner from "../../../Layouts/Spinner";
import Navbar from "../../../Layouts/Navbar/Navbar";
import ReactHtmlParser from "react-html-parser";
import post from "../../../../Reducers/post";
const Post = (props) => {
  const [isLiked, setlike] = useState("Like");
  const [isDislike, setdislike] = useState("Dislike");
  const [cttxt, settxt] = useState("");
  useEffect(() => {
    async function getdata() {
      await props.getsinglepost(props.id);
    }
    getdata();
  }, []);
  let likestr = isLiked;
  let dislikestr = isDislike;

  //Function to delete comment
  const deletecomment = async (e, postid, cmntid) => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const data = {
        id: cmntid,
      };
      await axios.post("/api/v1/posts/deletecomment/" + postid, data, config);
      await props.getsinglepost(props.id);
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (e) => {
    settxt(e.target.value);
  };
  const txt = cttxt;

  //Function for commenting
  const comment = async (e, id) => {
    e.preventDefault();
    const data = {
      id: id,
      comment: cttxt,
    };
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    try {
      await axios.post("/api/v1/posts/comment", data, config);
      props.getsinglepost(props.id);
      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //Function to like
  const like = async (e, id) => {
    e.preventDefault();
    if (isLiked != "Liked") {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const data = {};
      try {
        await axios.post("/api/v1/posts/likepost/" + id, data, config);
        setlike("Liked");
        setdislike("Dislike");
        await props.getsinglepost(props.id);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  //Function to dislike
  const dislike = async (e, id) => {
    e.preventDefault();
    if (isDislike != "Disliked") {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const data = {};
      try {
        await axios.post("/api/v1/posts/dislikepost/" + id, data, config);
        setdislike("Disliked");
        setlike("Like");
        await props.getsinglepost(props.id);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  /*Function to check if there the object is empty or not*/
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  if (!isEmpty(props.post)) {
    const post = props.post;
    const htmltxt = window.atob(post.posttext);
    const image = "/images/" + post.createrpic;
    if (typeof props.user === "string") {
      const usr = JSON.parse(props.user);
      console.log(props.user);
      const id = usr._id;
      props.post.likes.map((like) => {
        if (like.user.toString() === id.toString()) {
          likestr = "Liked";
        }
      });

      props.post.dislikes.map((dislike) => {
        if (dislike.user.toString() === id.toString()) {
          dislikestr = "Disliked";
        }
      });
    } else {
      const id = props.user._id;
      props.post.likes.map((like) => {
        if (like.user.toString() === id.toString()) {
          likestr = "Liked";
        }
      });

      props.post.dislikes.map((dislike) => {
        if (dislike.user.toString() === id.toString()) {
          dislikestr = "Disliked";
        }
      });
    }
    return (
      <Fragment>
        <Navbar />
        <div className={classes["post"]}>
          <div className={classes["heading"]}>
            <h1>{post.heading}</h1>
          </div>
          <hr />
          <div className={classes["stats"]}>
            <div className={classes["name"]}>
              <h3>
                <i className="fas fa-pencil-alt"></i> {post.name}
              </h3>
            </div>
            <div className={classes["prof"]}>
              <div
                className={classes["profile"]}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
            <div className={classes["stats-child"]}>
              <div className={classes["statno"]}>
                {post.likes.length} <i className="fas fa-thumbs-up blue"></i>
              </div>
              <div className={classes["statno"]}>
                {post.dislikes.length}
                <i className="fas fa-thumbs-down blue"></i>
              </div>
              <div className="statno">
                {post.comments.length} <i className="fas fa-comment blue"></i>
              </div>
            </div>
            <div className="cont">
              <button className="like" onClick={(e) => like(e, post._id)}>
                <i className="far fa-thumbs-up"></i> {likestr}
              </button>
              <button className="dislike" onClick={(e) => dislike(e, post._id)}>
                <i className="far fa-thumbs-down"></i> {dislikestr}
              </button>
            </div>
          </div>
          <div className="body">
            <div className="body-text">{ReactHtmlParser(htmltxt)}</div>
            <hr />
            <textarea
              className="textarea"
              placeholder="Describe your thoughts here..."
              onChange={(e) => onchange(e)}
              value={txt}
              type="text"
            ></textarea>
            <button className="cmnt" onClick={(e) => comment(e, post._id)}>
              Comment <i className="fas fa-comments"></i>
            </button>
            <h4>Comments</h4>
            {post.comments.map((comment) => {
              let id;
              if (typeof props.user === "string") {
                const user = JSON.parse(props.user);
                id = user._id;
              } else {
                id = props.user._id;
              }
              if (id.toString() === comment.user.toString()) {
                return (
                  <div className="comment">
                    <div className="box">
                      <p className="cmnt-txt">
                        <h4 className="creator">
                          <i className="fas fa-pen"></i> {comment.username}
                        </h4>
                        {comment.text}
                      </p>
                      <button className="delete">
                        <i className="fas fa-trash-alt"> </i> Delete
                      </button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="comment">
                    <div className="box">
                      <p className="cmnt-txt">
                        <h4 className="creator">
                          <i className="fas fa-pen"></i> {comment.username}
                        </h4>
                        {comment.text}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        ;
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};
Post.propType = {
  post: PropTypes.object.isRequired,
  getsinglepost: PropTypes.func.isRequired,
  id: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post.postdata,
  id: state.post.post,
  user: state.auth.user,
});
export default connect(mapStateToProps, { getsinglepost })(Post);
