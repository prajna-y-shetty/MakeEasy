const jwt = require("jsonwebtoken");
import { Service_Provider } from '../models';


exports.isAuthenticatedSP = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            res.status(401).json("Please Login to access this resource");
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.service_provider = await Service_Provider.findById(decodedData.id);

        next();
    } catch (error) {
        console.log(error);
        res.json("something went wrong");
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            res.status(403).send(
                `Role: ${req.user.role} is not allowed to access this resouce `
            );
        }

        next();
    };
};

