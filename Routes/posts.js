const express = require("express");

const router = express.Router();

/*Bring in the authentication middleware */
const auth = require("../Middlewares/auth");

const {
  createPost,
  likePost,
  dislikePost,
  getAllposts,
  getAllpostsofcurrentuser,
  editPost,
  deletePost,
  getFollowingpost,
  getsinglepost
  ,postcomment
  ,deletecomment
} = require("../Controllers/posts");

router.route("/posts/createpost").post(auth, createPost);

router.route("/posts/likepost/:id").post(auth, likePost);

router.route("/posts/comment").post(auth, postcomment);

router.route("/posts/deletecomment/:id").post(auth, deletecomment);

router.route("/posts/dislikepost/:id").post(auth, dislikePost);

router.route("/posts/getsinglepost").post(auth, getsinglepost);

router.route("/posts/getallposts").get(auth, getAllposts);

router.route("/posts/getyourposts").get(auth, getAllpostsofcurrentuser);

router.route("/posts/getfollowpost").get(auth, getFollowingpost);

router.route("/posts/editpost/:id").put(auth, editPost);

router.route("/posts/deletepost/:id").delete(auth, deletePost);



module.exports = router;
