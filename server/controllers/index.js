let passport = require("passport");
let jwt = require("jsonwebtoken");
let DB = require("../config/db");

// define the User Model
let userModel = require("../models/user");
let User = userModel.User; // alias

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server error?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      return res.json({ success: false, msg: "ERROR: Failed to Log In User." });
    }
    req.logIn(user, err => {
      // server error?
      if (err) {
        return next(err);
      }
      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email
      };

      const authToken = jwt.sign(payload, DB.secret, {
        expiresIn: 604800 // Token Expires in 1 week
      });

      return res.json({
        success: true,
        msg: "User Logged in successfully",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email
        },
        token: authToken
      });
    });
  })(req, res, next);
};

module.exports.processRegisterPage = (req, res, next) => {
  // define a new user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        console.log("Error: User Already Exists!");
      }
      return res.json({
        success: false,
        msg: "ERROR: Failed to Register User."
      });
    } else {
      return res.json({ success: true, msg: "User Registered Successfully!" });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({ success: true, msg: "User Successfully Logged Out" });
};
