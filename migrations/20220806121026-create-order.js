"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: "Users", key: "id" },
            },
            drugId: {
                type: Sequelize.INTEGER,
                references: { model: "Drugs", key: "id" },
            },
            amount: {
                type: Sequelize.INTEGER,
                validate: {
                    notNull: { message: "amount is required" },
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
        await queryInterface.dropTable("Orders");
    },
};
