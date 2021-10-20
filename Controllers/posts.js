/*Controller file for posts */

/*Bring the post model */
const Post = require("../Models/Posts");

const Profile = require("../Models/Profile");

const mongoose = require("mongoose");
/*
@desc:CREATE A POST
@route:/posts/createpost
@access:PRIVATE
*/

exports.createPost = async (req, res, next) => {
  try {
    /*Post object for creating a post*/
    const post = {};

    /*Array for errors */
    const errors = [];
    post.user = req.user._id;
    post.createdby = req.user._id;
    if (!req.body.posttext) {
      errors.push("Please add a text for creating post");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    if (!req.body.heading) {
      errors.push("Please add a heading for creating post");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    post.posttext = req.body.posttext;
    post.heading = req.body.heading;
    post.name = req.user.firstname + " " + req.user.lastname;
    const prof = await Profile.findOne({ user: req.user._id });
    if (prof) {
      post.createdby = req.user._id;
    } else {
      post.createdby = "not_set";
    }
    const createdPost = await Post.create(post);
    return res.status(200).json({
      success: true,
      data: createdPost,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

/*
@desc:Get all post
@route:/posts/getallposts
@access:PRIVATE
*/

exports.getAllposts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
@desc:Like a post
@route:/posts/likepost/:postid
@access:PRIVATE
*/
exports.likePost = async (req, res, next) => {
  try {
    const Postid = req.params.id;
    const errors = [];
    if (!Postid) {
      errors.push("Post not found");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /*Check if the post exists or not  */
    const post = await Post.findById(Postid);
    if (!post) {
      errors.push("Post not found");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /*Check if the post is already liked */

    post.likes.forEach((user) => {
      if (user.user.toString() === req.user._id.toString()) {
        errors.push("Post already liked");
      }
    });

    /* Return  if the user has already liked the post */
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /*Check if the user has disliked the post then remove from the disliked method*/
    post.dislikes = post.dislikes.filter(
      (user) => user.user.toString() != req.user._id.toString()
    );

    /*Create a like object */
    const likeobject = {};
    likeobject.user = req.user._id;

    post.likes.push(likeobject);
    await post.save();

    res.status(200).json({
      success: true,
      data: "Post liked successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
/*
@desc:Dislike a post
@route:/posts/dislikepost/:postid
@access:PRIVATE
*/
exports.dislikePost = async (req, res, next) => {
  try {
    const Postid = req.params.id;
    const errors = [];
    if (!Postid) {
      errors.push("Post not found");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /*Check if the post exists or not  */
    const post = await Post.findById(Postid);
    if (!post) {
      errors.push("Post not found");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /*Check if the post is already disliked */

    post.dislikes.forEach((user) => {
      if (user.user.toString() === req.user._id.toString()) {
        errors.push("Post already disliked");
      }
    });
    /* Return  if the user has already liked the post */
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /*Check if the user has liked the post then remove from the liked method*/

    post.likes = post.likes.filter(
      (user) => user.user.toString() != req.user._id.toString()
    );

    /*Create a like object */
    const dislikeobject = {};
    dislikeobject.user = req.user._id;

    post.dislikes.push(dislikeobject);
    await post.save();

    res.status(200).json({
      success: true,
      data: "Post disliked successfully",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

/*
@desc:Edit a post
@route:/posts/editpost/:id
@access:PRIVATE
*/
exports.editPost = async (req, res, next) => {
  try {
    const postid = req.params.id;
    const errors = [];
    if (postid.toString().length != 24) {
      errors.push("There is no post available");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    /*The text to be updated */
    const posttext = req.body.posttext;
    const postheading = req.body.heading;
    /*Get the current post to be edited */

    const post = await Post.findById(postid);

    if (!post) {
      errors.push("There is no post available");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    /* Check if the post to be edited belongs to the user or not*/
    if (post.user.toString() != req.user._id.toString()) {
      errors.push("Not authorized to edit this post");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    if (!posttext) {
      errors.push("Please insert some content to the post");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    post.posttext = posttext;
    post.heading = postheading;
    await post.save();
    res.status(200).json({
      success: false,
      data: "Post edited succssfully",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

/*
@desc:Comment on a postt
@route:/posts/comment
@access:PRIVATE
*/
exports.postcomment = async (req, res, next) => {
  try {
    const { id, comment } = req.body;
    if (!id || !comment) {
      return res.status(400).json({
        success: false,
        data: "Invalid request",
      });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(400).json({
        success: false,
        data: "Invalid request",
      });
    }
    const obj = {};
    obj.user = req.user._id;
    obj.username = req.user.firstname + " " + req.user.lastname;
    obj.text = comment;
    post.comments.push(obj);
    await post.save();
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};
/*
@desc:Delete a comment
@route:/posts/deletecomment
@access:PRIVATE
*/
exports.deletecomment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const commentid = req.body.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        data: "There is no post available",
      });
    }
    post.comments = post.comments.filter(
      (cmt) => cmt._id.toString() != commentid.toString()
    );
    await post.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
@desc:Get all posts of a current user
@route:/posts/getyourposts
@access:PRIVATE
*/
exports.getAllpostsofcurrentuser = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort("-createdAt");
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
@desc:Delete a post
@route:/posts/deletepost/:id
@access:PRIVATE
*/

exports.deletePost = async (req, res, next) => {
  try {
    const postid = req.params.id;
    const errors = [];
    const post = await Post.findById(postid);

    /*If the length of the user id is smaller than 43 */
    if (postid.toString().length != 24) {
      errors.push("There is no post available");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /* If there is no post available for this id*/
    if (!post) {
      errors.push("There is no post available");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    /* Check if the post to be edited belongs to the user or not*/
    if (post.user.toString() != req.user._id.toString()) {
      errors.push("Not authorized to delete this post");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    await Post.findByIdAndDelete(postid);

    res.status(200).json({
      success: true,
      data: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

/*
@desc:GET ALL OF YOUR FOLLOWING POSTS
@route:/posts/getfollowposts
@access:PRIVATE
*/
exports.getFollowingpost = async (req, res, next) => {
  try {
    const currentuser = await Profile.findOne({ user: req.user._id });
    const usrfollowing = currentuser.following;
    const ids = [];
    usrfollowing.forEach((user) => {
      ids.push(new mongoose.Types.ObjectId(user.user));
    });
    /*get all the posts of the users following and sort that with the help of date */
    const posts = await Post.find({
      user: {
        $in: ids,
      },
    })
      .sort("-createdAt")
      .limit(20);

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
/*
@desc:GET SINGLE POST
@route:/posts/getsinglepost
@access:PRIVATE
*/
exports.getsinglepost = async (req, res, next) => {
  try {
    const id = req.body.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        data: "There is no post with this id",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      data: "There is no post with this id",
    });
  }
};
