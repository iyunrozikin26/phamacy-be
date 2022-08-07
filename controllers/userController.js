const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class Controller {
    static async postRegisterPatient(req, res, next) {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        let { phoneNumber, gender, dateOfBirth, ktp, password } = req.body;
        let birthDate;
        let checkingBirthDate;
        try {
            ktp = ktp.match(/\d/g).join("");

            if (!strongRegex.test(password)) throw { name: "passwordError", message: "password, min. an lowercase, min. an uppercase, min. an number, min. an special character" };

            const [year, month, day] = dateOfBirth.split("-");

            if (month > 0 && month <= 12 && day > 0 && day <= 31) {
                birthDate = new Date(+year, month - 1, +day + 1);
            } else {
                throw { name: "dateNotValid", message: "birth date not valid format" };
            }

            const PHONE = phoneNumber[0] == 0 ? phoneNumber.slice(1, 16) : phoneNumber;

            const KTP = gender.toLowerCase() == "female" ? ktp + 40 : ktp;

            checkingBirthDate = day + month + year.slice(2);

            if (ktp.slice(6, 12) != checkingBirthDate) throw { name: "ktpInvalid", message: "your ktp  numbers is not valid" };

            const newUser = {
                phoneNumber: "62" + PHONE,
                gender,
                dateOfBirth: birthDate,
                ktp: KTP,
                password,
                role: "patient",
            };

            const createNewUser = await User.create(newUser);

            res.status(201).json({ status: "succes to create new patient", username: createNewUser.phoneNumber });
        } catch (error) {
            console.log(error);
        }
    }

    static async postLoginPatient(req, res, next) {
        let { phoneNumber, password } = req.body;
        try {
            if (phoneNumber[0] == 0) {
                phoneNumber = "62" + phoneNumber.slice(1, 16);
            } else {
                phoneNumber = "62" + phoneNumber    ;
            }
            const userLogin = await User.findOne({ where: { phoneNumber } });
            if (!userLogin) {
                throw { name: "invalidLogin", message: "wrong username / password" };
            } else {
                if (comparePassword(password, userLogin.password)) {
                    const access_token = signToken({ phoneNumber });
                    if (!access_token) {
                        throw { name: "invalidLogin", message: "wrong username / password" };
                    } else {
                        res.status(200).json({
                            access_token,
                            role: userLogin.role,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Controller;
