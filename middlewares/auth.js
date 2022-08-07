const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers;
        if (!access_token) throw { name: "InvalidToken" };
        let payload = verifyToken(access_token);

        let user = await User.findOne({ where: { phoneNumber: payload.phoneNumber } });
        if (!user) throw { name: "InvalidToken" };

        req.user = {
            id: user.id,
            phoneNumber: payload.phoneNumber,
            role: user.role,
        };
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

const adminAccess = async (req, res, next) => {
    try {
        if (req.user.role.toLowerCase() == "admin") next();
        else throw { status: 403, message: "not allowed access" };
    } catch (error) {
        console.log(error);
        res.status(error.status).json(error.message);
    }
};

module.exports = { authentication, adminAccess };
