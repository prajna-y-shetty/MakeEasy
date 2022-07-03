const { User, Service_Provider, Service } = require("../models");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const {
  createTransaction,
  generateLink,
  getTransaction,
} = require("./payment");

// Register a User
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user, userId;

    //get user with email, if exist
    const existUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existUser && existUser.status === 1) {
      //alrerady exist and email verified
      throw new console.error("user already exist");
    } else if (existUser && existUser.status === 0) {
      //already exist but not verfied email
      user = await User.update(
        {
          name,
          password: await bcrypt.hash(password, 10),
        },
        {
          where: {
            email,
          },
        }
      );
      userId = existUser.id;
    } else {
      //no user exist
      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        status: 0, //Email not verified.
      });
      userId = user.id;
    }
    //Send verification email here
    const emailOptions = {
      email,
      subject: "please verify you account for make-easy",
      message: `<h1>Hey folks,</h1>
            <p>please verify your link by clicking this below link</p>
            <a href="http://localhost:8000/api/verifyEmail/${userId}">CLICK HERE</a>
        `,
    };
    await sendEmail(emailOptions);

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json("Oops! Something went wrong!");
  }
};

// Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return res.json({
        status: "error",
        error: "Invalid email",
      });
    }
    const user = await User.findOne({
      where: {
        email: email,
        status: 1, //Email verified
      },
    });

    if (!user) {
      return res.json({
        status: "error",
        error: "Invalid  password",
      });
    }
    let orginalpassword = user.password;
    const isPasswordMatched = await bcrypt.compare(password, orginalpassword);
    if (!isPasswordMatched) {
      return res.json({
        status: "error",
        error: "Invalid email or password",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      error: "Somethig went wrong",
    });
  }
};
// Logout User
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    return res.json({
      staus: "error",
      error: "Logged Out",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      error: "something went wrong",
    });
  }
};
// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "User not found",
      });
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Password Recovery mail`,
        message,
      });
      return res.json({
        status: true,
        error: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = null;
      user.resetPasswordExpire = null;

      await user.save();

      return res.json({
        status: "error",
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      error: "something went wrong",
    });
  }
};
// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    // creating token hash
    const resetToken = req.params.token;
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      where: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.json({
        status: "error",
        message: "Reset Password Token is invalid or has been expired",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).json({
        status: "error",
        message: "Password does not match",
      });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (user) {
      res.status(200).json({ status: "ok", user: user });
    } else {
      res.json({
        status: "error",
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    await User.update(
      {
        status: 1, //Email verified.
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.send("<h1>Hey your mail verified </h1>");
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};

exports.bookService = async (req, res, next) => {
  try {
    let response = await generateLink({
      amount: Number(req.body.price) * 100,
      reference_id:
        "booking_" +
        Number(req.body.price) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      customer_name: req.body.name,
      customer_email: req.body.email,
      customer_contact: req.body.phone,
    });
    if (!response || !response.short_url)
      return res.json({ status: "error", message: "Something went wrong" });
    let db = await createTransaction(req.body);
    if (!db) throw new Error("create transaction failed");
    const req_user = await User.findOne({
      where: {
        id: req.body.user_id,
      },
    });
    if (!req_user) throw new Error("user not found");
    const req_service = await Service.findOne({
      where: {
        id: req.body.service_id,
      },
    });

    const req_serviceProvider = await Service_Provider.findOne({
      where: {
        id: req.body.service_provider_id,
      },
    });

    const emailOptions = {
      email: req_serviceProvider.email,
      subject: "You got service request from makeeasy client",
      message: `<h1>Hey ${req_serviceProvider.name}</h1>
            <p>You have an service request from client. ${req_user.name}</p>
            <p>Service Name: ${req_service.name}</p>
            <p>Service Price: ${req_service.price}</p>
            <p>Service Description: ${req_service.description}</p>
            <p>Contact Email: ${req_user.email}</p>
        `,
    };
    await sendEmail(emailOptions);
    res.json({ status: "ok", response });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

exports.bookingHistory = async (req, res, next) => {
  try {
    let response = await getTransaction(req.body);
    if (!response)
      return res.json({ status: "error", message: "Something went wrong" });
    res.json({ status: "ok", response });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};
