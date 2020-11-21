import React,{Fragment,useState,useEffect} from 'react'
import {connect} from 'react-redux';
import {getsinglepost} from '../../../Actions/post';
import PropTypes from 'prop-types';
import classes from './post.module.css';
import axios from 'axios';
import Spinner from '../../Layouts/Spinner';
import Navbar from '../../Layouts/Navbar/Navbar';
import ReactHtmlParser from 'react-html-parser';
const Post = (props) =>  {
    const [isLiked,setlike] = useState('Like');
    const [isDislike,setdislike] = useState('Dislike');
    const [cttxt,settxt] = useState('');
    useEffect(() => {
        props.getsinglepost(props.id);
    },[])

    let likestr = isLiked;
    let dislikestr = isDislike;

    const deletecomment  = async (e,postid,cmntid) => {
       try {
            const config = {
              headers: {
                "x-auth-token": localStorage.getItem("token")
              }
            };
            const data = {
                id:cmntid
            }
            await axios.post(
              "/api/v1/posts/deletecomment/"+postid,
              data,
              config
            );
            await props.getsinglepost(props.id);
       } catch (error) {
            console.log(error);
       }
    }

    const onchange  = e => {
        settxt(e.target.value);
    }
    const txt = cttxt;

    const comment = async (e,id) => {
        e.preventDefault();
        const data = {
            id:id,
            comment:cttxt
        }
            const config = {
              headers: {
                "x-auth-token": localStorage.getItem("token")
              }
            };
        try {
            await axios.post(
              "/api/v1/posts/comment",
              data,
              config
            );
             props.getsinglepost(props.id);
            window.scrollTo(
              0,
              document.body.scrollHeight
            );


        } catch (error) {
            console.log(error.response.data)
        }
    }


    const like = async (e,id) => {
        e.preventDefault();
        if(isLiked!='Liked'){
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    };
    const data={};
        try {
                await axios.post(
                "/api/v1/posts/likepost/" + id,
                data,
                config
              );
              setlike('Liked');
              setdislike('Dislike');
           await props.getsinglepost(props.id);
        } catch (error) {
            console.log(error.response);
        }
        }
    }

    const dislike = async (e,id) => {
        e.preventDefault();
        if(isDislike!='Disliked'){
               const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    };
    const data={};
        try {
                await axios.post(
                "/api/v1/posts/dislikepost/" + id,
                data,
                config
              );
              setdislike('Disliked');
              setlike('Like')
            await props.getsinglepost(props.id);
        } catch (error) {
            console.log(error.response);
        }
        }
    }

    /*Function to check if there the object is empty or not*/
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

if(!isEmpty(props.post)){
    const post =  props.post;
    const htmltxt = window.atob(post.posttext);
    const image = "/images/"+post.createrpic;

if (typeof props.user === "string") {
   const usr = JSON.parse(props.user);
   const id = usr._id;
   props.post.likes.map(like => {
     if (like.user.toString() === id.toString()) {
         likestr = "Liked";
     }
   });

      props.post.dislikes.map(dislike => {
        if (dislike.user.toString() === id.toString()) {
          dislikestr = "Disliked";
        }
      });

 }
 else{
        const id = props.user._id;
        props.post.likes.map(like => {
          if (like.user.toString() === id.toString()) {
              likestr="Liked";
          }
        });

          props.post.dislikes.map(dislike => {
                if (dislike.user.toString() === id.toString()) {
                  dislikestr = "Disliked";
                }
         });
 }
    return (
      <Fragment>
        <Navbar />
        <div className={"container " + classes["one"]}>
          <div className={classes["heading"]}>
            <p>{post.heading}</p>
          </div>
          <div clasdName={classes["lnc"]}>
            <p>
              {post.likes.length} <i className="fas fa-thumbs-up"></i>{" "}
            </p>
            <p>
              {post.dislikes.length} <i className="fas fa-thumbs-down"></i>{" "}
            </p>
            <p>
              {post.comments.length} <i className="fas fa-comments"></i>{" "}
            </p>
          </div>
          <div className={"container d-flex pt-3 " + classes["two"]}>
            <div
              className={classes["pic"]}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
          <div className={classes["created"]}>
            <p>
              {" "}
              <i className="fas fa-pen"></i> {post.name}
            </p>
          </div>
        </div>

        <div className="container" style={{ position: "relative" }}>
          <button
            onClick={e => like(e, post._id)}
            className={classes["postlike"]}
          >
            <i className="fas fa-thumbs-up">{likestr}</i>
          </button>
          <button
            className={classes["edit"]}
            onClick={e => dislike(e, post._id)}
          >
            <i className="fas fa-thumbs-down"></i> {dislikestr}
          </button>
        </div>
        <hr />
        <div className={"container " + classes["post"]}>
          <div
            align="justify"
        >   {ReactHtmlParser(htmltxt)}</div>
        </div>
        <hr />
        <div className={"container " + classes["comments"]}>
          <h5>Comments</h5>
          <div className={classes["info"]}></div>
          <form className={classes["create"]}>
            <textarea
              className={classes["comment"]}
              type="text"
              placeholder="Comment"
              onChange={e => onchange(e)}
              value={txt}
            />
            <button onClick={e => comment(e, post._id)}>Post</button>
          </form>
          {post.comments.map(comment => {
            let id;
            if (typeof props.user === "string") {
              const user = JSON.parse(props.user);
              id = user._id;
            } else {
              id = props.user._id;
            }
            if (id.toString() === comment.user.toString()) {
              return (
                <div className={classes["usr"]}>
                  <div className={classes["name"]}>{comment.username}</div>
                  <div className={classes["cmnttxt"]}>
                    <p>{comment.text}</p>
                  </div>
                  <button
                    className={classes["deletebtn"]}
                    onClick={e => deletecomment(e, post._id, comment._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            } else {
              return (
                <div className={classes["usr"]}>
                  <div className={classes["name"]}>{comment.username}</div>
                  <div className={classes["cmnttxt"]}>
                    <p>{comment.text}</p>
                  </div>
                </div>
              );
            }
          })}
          <div id="last"></div>
        </div>
      </Fragment>
    );
    }
    else{
        return <Spinner/>
    }
}
Post.propType = {
    post:PropTypes.object.isRequired,
    getsinglepost:PropTypes.func.isRequired,
    id:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post:state.post.postdata,
    id:state.post.post,
    user:state.auth.user
})
export default connect(mapStateToProps,{getsinglepost})(Post);
