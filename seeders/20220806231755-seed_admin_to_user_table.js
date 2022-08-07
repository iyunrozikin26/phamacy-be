"use strict";

const { hashingPassword } = require("../helpers/bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        const admin = {
            phoneNumber: "6282339835783",
            gender: "male",
            dateOfBirth: new Date(),
            ktp: "5204172601970001",
            password: hashingPassword("11223344aA@"),
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await queryInterface.bulkInsert("Users", [admin]);
        /**
         * Add seed commands here.
         *
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null);

        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
