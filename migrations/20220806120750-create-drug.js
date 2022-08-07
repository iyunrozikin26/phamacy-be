"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Drugs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
                validate: {
                    notNull: { message: "name is required" },
                    notEmpty: { message: "not allowed empty string" },
                },
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notNull: { message: "price is required" },
                    notEmpty: { message: "not allowed empty string" },
                    min: 0,
                },
            },
            stock: {
                allowNull: false,
                type: Sequelize.INTEGER,
                validate: {
                    notNull: { message: "stock is required" },
                    notEmpty: { message: "not allowed empty string" },
                    min: 0,
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Drugs");
    },
};
