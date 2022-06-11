const { User } = require("../models");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize')
const { validationResult } = require('express-validator');


// Register a User
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log({ name, email, password });
        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        });
        console.log({user})
        return res.json("Registration completed.");

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
                status : "error",
                error : "Invalid email"
            });
        }
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.json({
                status :"error",
                error : "Invalid  password"
            });
        } 
        let orginalpassword = user.password;
        const isPasswordMatched =
            await bcrypt.compare(password, orginalpassword);
        if (!isPasswordMatched) {
           return res.json({
               status : "error",
               error : "Invalid email or password"
            });
        }
        sendToken(user, 200, res);
    } catch (error) {
        console.log(error);
        return res.json({
            status : "error",
            error :"Somethig went wrong"});
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
            error: "Logged Out" });

    } catch (error) {
        console.log(error);
        res.send({
            status: "error",
            error: "something went wrong"});
    }
};
// Forgot Password
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        });
        if (!user) {
            return res.status(404).json({
                status: "error",
                error: "User not found" });
        }

        // Get ResetPassword Token
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

        const message =
            `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

        try {

            await sendEmail({
                email: user.email,
                subject: `Password Recovery mail`,
                message,
            });
            return res.json({
                status: true,
                error: `Email sent to ${user.email} successfully`});
        } catch (error) {
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;

            await user.save();

            return res.json({
                status: "error",
                error: error.message })
        };
    }
    catch (error) {
        console.log(error);
        return res.json({
            status : "error",
            error: "something went wrong"});
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
                resetPasswordExpire:
                    { [Op.gt]: Date.now() },
            }
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
                message: "Password does not match"
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
                id: req.user.id
            },
            attributes: {
                exclude: ['password']
            }
        })
        if (user) {
            res.status(200).json({ status: "ok", user: user });
        } else {
            res.json({
                status: 'error',
                message: "user not found"
            })
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }

}


