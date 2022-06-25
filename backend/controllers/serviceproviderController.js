const { Service_Provider } = require("../models");
const sendToken = require("../utils/jwtToken");
// const s1endEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const sendEmail = require("../utils/sendEmail");

exports.registersp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user, userId;

    //get user with email, if exist
    const existUser = await Service_Provider.findOne({
      where: {
        email,
      },
    });
    if (existUser && existUser.status === 1) {
      //alrerady exist and email verified
      throw new console.error("user already exist");
    } else if (existUser && existUser.status === 0) {
      //already exist but not verfied email
      user = await Service_Provider.update(
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
      user = await Service_Provider.create({
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
                <a href="http://localhost:8000/api/service_provider/verifyEmail/${userId}">CLICK HERE</a>
            `,
    };
    await sendEmail(emailOptions);
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json("Oops! Something went wrong!");
  }
};

exports.loginsp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // checking if user has given password and email both

    if (!email || !password) {
      return res.json({
        status: "error",
        error: "Invalid email",
      });
    }
    const service_provider = await Service_Provider.findOne({
      where: {
        email: email,
      },
    });

    if (!service_provider) {
      return res.json({
        status: "error",
        error: "Invalid  password",
      });
    }
    let orginalpassword = service_provider.password;
    const isPasswordMatched = await bcrypt.compare(password, orginalpassword);
    if (!isPasswordMatched) {
      return res.json({
        status: "error",
        error: "Invalid email or password",
      });
    }
    console.log({ service_provider }, "=========>");
    sendToken(service_provider, 200, res);
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      error: "Somethig went wrong",
    });
  }
};

exports.profilesp = async (req, res, next) => {
  try {
    const { name, service_id, phone, address, user_id } = req.body;
    const service_provider = await Service_Provider.update(
      {
        phone,
        address,
        name,
        service_id,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      error: error,
    });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log({ user_id });
    await Service_Provider.update(
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

exports.getUser = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const user = await Service_Provider.findOne({
      where: {
        id: user_id,
      },
    });
    
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};

exports.getUserList = async (req, res, next) => {
  try {
    const { service_id } = req.body;
    const user = await Service_Provider.findAll({
      where: {
        service_id: service_id,
      },
    });
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};
