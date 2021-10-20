/*Bring the user model */
const User = require("../Models/User");

/*Bring the profile model */
const Profile = require("../Models/Profile");

const path = require("path");

/*Module for file management in js */
const fs = require("fs");
/*
@desc : Create or update a profile 
@route :/profiles/profilemodify
@access : PUBLIC
@POST REQUEST
*/
exports.profileCreation = async (req, res, next) => {
  try {
    /*Array for storing all the error messeges */
    const errors = [];

    /*The required fields are university,role,skills */
    if (!req.body.university) {
      errors.push("Please provide a university");
    }
    if (!req.body.role) {
      errors.push("Please add a role");
    }
    if (!req.body.skills) {
      errors.push("Please add your skills");
    }
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    /*Profile field object for creating a profile field */
    const profileFields = {};
    if (req.body.name) {
      profileFields.name = req.body.name;
    } else {
      profileFields.name = req.user.firstname + " " + req.user.lastname;
    }
    profileFields.email = req.user.email;
    profileFields.university = req.body.university;
    profileFields.role = req.body.role;
    profileFields.skills = req.body.skills;

    /*Set the user field of the profile to req.user._id */
    profileFields.user = req.user._id;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.youtube) profileFields.youtube = req.body.youtube;
    if (req.body.instagram) profileFields.instagram = req.body.instagram;
    if (req.body.github) profileFields.github = req.body.github;
    if (req.body.linkedin) profileFields.linkedin = req.body.linkedin;

    /*Check if the profile exists, if it exists then update it */
    profile = await Profile.findOne({ user: req.user._id });

    /* Profile photo */

    /*If the file exists*/
    if (req.files) {
      const file = req.files.file;

      /*Check if the file is of type image */
      /*The sent file has a property of mimetype which is always image/fileformat*/

      if (file.mimetype.startsWith("image")) {
        /*Check filesize*/

        if (file.size < 1000000) {
          /*path.parse gives the file extension  */
          file.name = `${req.user.id}${path.parse(file.name).ext}`;
          if (profile) {
            if (profile.profileimagetext != null) {
              /*If there is a alredy a profile then delete it  first*/
              filepath = `${process.env.FILE_UPLOAD_PATH}/${profile.profileimagetext}`;
              !fs.unlinkSync(filepath);
            }
          }
          file.mv(
            `${process.env.FILE_UPLOAD_PATH}/${file.name}`,
            async (err) => {
              if (err) console.log(err);
            }
          );

          /*If there is a profile then update it and return the new profile */
          profileFields.profileimagetext = file.name;
          if (profile) {
            profile = await Profile.findOneAndUpdate(
              { user: req.user._id },
              { $set: profileFields },
              { new: true, runValidators: true }
            );
            return res.status(200).json({
              success: true,
              data: profile,
            });
          }
        }
      }
    }

    /*If there is no file and if there exists a profile then we need to update the profile */
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        success: true,
        data: profile,
      });
    }

    /*If the profile does not exists then create a profile and send it as a responce */
    profile = await Profile.create(profileFields);

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: "Session expired",
    });
  }
};

/*
@desc : Get current profile
@route :/profiles/getcurrentprofile
@access : PRIVATE
@GET REQUEST
*/
exports.getCurrentProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(400).json({
        success: false,
        data: "No profile is there for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      data: "Session expired",
    });
  }
};

/*
@desc : Get all profile
@route :/profiles/allprofiles
@access : PRIVATE
@GET REQUEST
*/
exports.getAllprofiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();

    res.status(200).json({
      success: true,
      data: profiles,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
@desc : Follow a user/profile
@route :/profiles/followuser/:id
@access : PRIVATE
@POST REQUEST
*/
exports.followuser = async (req, res, next) => {
  try {
    /* Get the id of the user to be followed */
    const useridtofollow = req.params.id;

    /*Get the profile of the user to follow */
    const profile = await Profile.findOne({ user: useridtofollow });

    /*Get the current user profile */
    const userprofile = await Profile.findOne({ user: req.user._id });

    const errors = [];
    if (!profile) {
      errors.push("No user found to follow");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }

    /*Check if the user is already following */

    userprofile.following.forEach((user) => {
      if (user.user.toString() === useridtofollow.toString()) {
        errors.push("Already followed");
      }
    });

    if (errors.length > 0) {
      return res.status(200).json({
        success: true,
        data: errors,
      });
    }
    /*Increase the follower list of the person who is followed */
    const flo = {};
    flo.user = req.user._id;
    profile.followers.push(flo);

    /*Increase the following list of the current user */
    flo.user = useridtofollow;
    userprofile.following.push(flo);

    await userprofile.save();
    await profile.save();
    res.status(200).json({
      success: true,
      data: "Following",
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
/*
@desc : Unfollow a profile
@route :/profiles/unfollowuser/:id
@access : PRIVATE
@POST REQUEST
*/
exports.UnfollowUser = async (req, res, next) => {
  try {
    /* Get the id of the user to be unfollowed */
    const useridtounfollow = req.params.id;

    /*Get the profile of the user to be unfollowed */
    const profile = await Profile.findOne({ user: useridtounfollow });

    /*Get the current user profile */
    const userprofile = await Profile.findOne({ user: req.user._id });
    const errors = [];
    if (!profile) {
      errors.push("No user found to follow");
      return res.status(400).json({
        success: false,
        data: errors,
      });
    }
    /*Update the user profiles */
    profile.followers = profile.followers.filter(
      (user) => user.user.toString() != req.user._id.toString()
    );

    userprofile.following = userprofile.following.filter(
      (user) => user.user.toString() != useridtounfollow.toString()
    );

    await Profile.findOneAndUpdate({ user: useridtounfollow }, profile);
    await Profile.findOneAndUpdate({ user: req.user._id }, userprofile);
    res.status(200).json({
      success: true,
      data: "Unfollow succcess",
    });
  } catch (error) {
    console.log("error here".red);
    console.log(error);
  }
};

/*
@desc : Delete a profile
@route :/profiles/getcurrentprofile
@access : PRIVATE
@DELETE REQUEST
*/

exports.deleteProfile = async (req, res, next) => {
  try {
    await Profile.findOneAndDelete({ user: req.user._id });
    res.status(200).json({
      success: true,
      data: "Profile deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      json: "Session expired",
    });
    next();
  }
};

/*
@desc : Get a profile by userid
@route :/profiles/getuserprofile:/id
@access : PRIVATE
*/
exports.getuserprofile = async (req, res, next) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({ user: id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        data: "There is no profile with this id",
      });
    }
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

/*
@desc : Get a profile image text for a particular user
@route :/profiles/getprofilestring:/id
@access : PRIVATE
*/

exports.getProfileString = async (req, res, next) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findOne({ user: id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        data: "There is no profile with this id",
      });
    }
    res.status(200).json({
      success: true,
      data: profile.profileimagetext,
    });
  } catch (error) {
    console.log(error);
    next();
  }
};
