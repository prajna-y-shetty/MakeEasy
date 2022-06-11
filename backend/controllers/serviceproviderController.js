const { Service_Provider } = require('../models')
const sendToken = require("../utils/jwtToken");
// const s1endEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize')

exports.registersp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const service_provider = await Service_Provider.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        });
        return res.json("Registration completed.");

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
                error: "Invalid email"
            });
        }
        const service_provider = await Service_Provider.findOne({
            where: {
                email: email
            }
        });

        if (!service_provider) {
            return res.json({
                status: "error",
                error: "Invalid  password"
            });
        }
        let orginalpassword = service_provider.password;
        const isPasswordMatched =
            await bcrypt.compare(password, orginalpassword);
        if (!isPasswordMatched) {
            return res.json({
                status: "error",
                error: "Invalid email or password"
            });
        }
        console.log({service_provider},"=========>");
        sendToken(service_provider, 200, res);
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            error: "Somethig went wrong"
        });
    }
};