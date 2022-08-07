"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Order, { foreignKey: "userId" });
        }
    }
    User.init(
        {
            phoneNumber: DataTypes.STRING,
            gender: DataTypes.STRING,
            dateOfBirth: DataTypes.DATE,
            ktp: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    User.addHook("beforeCreate", (user) => {
        user.password = hashingPassword(user.password);
    });
    return User;
};
