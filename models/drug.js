"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Drug extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Drug.hasMany(models.Order, { foreignKey: "drugId" });
        }
    }
    Drug.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Drug",
        }
    );
    return Drug;
};
