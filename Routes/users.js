const express = require('express');

/*Use Routes */
const router = express.Router();

/*Bring the auth middleware */
const auth = require('../Middlewares/auth');

/*All route functions are in the Controller folder */
const {
  registerUser,
  verifyEmail,
  login,
  forgotpassword,
  resetpassword,
  deleteUser,
  currentUser,
} = require("../Controllers/user");


router.route("/users/register").post(registerUser);

router.route("/users/emailverification").post(verifyEmail);

router.route("/users/resetpassword").post(resetpassword);


router.route("/users/login").post(login);

router.route("/users/forgotpassword").get(forgotpassword);

router.route("/users/getcurrentuser").get(auth, currentUser);

router.route("/users/deleteuser").delete(auth, deleteUser);



module.exports = router;