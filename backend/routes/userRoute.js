const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
  verifyEmail,
  bookService,
  bookingHistory,
} = require("../controllers/userController");
//const { body, validationResult } = require('express-validator');

//const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/password/forgot", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/logout", logout);

router.get("/verifyEmail/:user_id", verifyEmail);

router.post("/booking", bookService);

router.post("/bookingHistory", bookingHistory);

module.exports = router;
