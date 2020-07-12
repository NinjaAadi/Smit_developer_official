import React,{useEffect,useState,Fragment,Link} from 'react'
import {useHistory} from 'react-router-dom';
import classes from './prepost.module.css';
import {connect} from 'react-redux';
import { getuserposts, seteditpost } from "../../../Actions/post";
import PropTypes from 'prop-types';
import Navbar from '../../Layouts/Navbar/Navbar';

const Userposts = (props) => {
useEffect(() => {
    const getpost = async () => {
    await props.getuserposts();
}
getpost();

}, []);
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
if(isEmpty(props.post)){
    console.log("Empty");
}
else {
    console.log(props.post)
}
const history = useHistory();
const edit = async (e, post) => {
  e.preventDefault();
  await props.seteditpost(post._id);
  history.push('/editpost');
};

if (!isEmpty(props.post)) {
  return (
    <Fragment>
        <Navbar/>
      {props.post.map(post => {

        return (
          <Fragment>
            <div className={"container " + classes["post"]}>
              <div className={classes["heading"]}>
                <p>{post.heading}</p>
              </div>
              <div className={classes["details"]}>
                <div className={classes["name"]}>
                  <p>
                    {" "}
                    <i className="fas fa-pen"></i>
                    {post.name}
                  </p>
                </div>
                <div className={classes["created"]}>
                  <p>{post.createdAt.toString()}</p>
                </div>
              </div>
              <div className={classes["text"]}>

                <button
                  className={classes["full"]}
                  onClick={e => edit(e, post)}
                >
                 Edit
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
} else {

  return (
    <Fragment>
      <Navbar />
      <div className="container" style={{ textAlign: "center",marginTop:"100px",fontSize:"20px",textTransform:"uppercase",color:"grey"}}>
        <p>You do not have any posts..</p>{" "}
      </div>
    </Fragment>
  );
}
}
Userposts.propTypes = {
  getuserposts: PropTypes.func.isRequired,
  seteditpost: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  post: state.post.currnetuserposts

});
export default connect(mapStateToProps, {
  getuserposts,
  seteditpost,
  seteditpost
})(Userposts);
