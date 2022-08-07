"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            phoneNumber: {
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        message: "Phone Number required",
                    },
                    notEmpty: {
                        args: true,
                        message: "Phone Number is not allowed to empty string",
                    },
                    isNumeric: true,
                    min: {
                        args: 11,
                        msg: "Minimum 11 characters required",
                    },
                    max: {
                        args: 16,
                        msg: "Maximum 16 characters",
                    },
                },
                type: Sequelize.STRING,
                unique: true,
            },
            gender: {
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        message: "Gender required",
                    },
                    notEmpty: {
                        args: true,
                        message: "Gender is not allowed to empty string",
                    },
                },
                type: Sequelize.STRING,
            },
            dateOfBirth: {
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        message: "Date Of Birth required",
                    },
                    notEmpty: {
                        args: true,
                        message: "Date Of Birth is not allowed to empty string",
                    },
                    isDate: {
                        args: true,
                        message: "please input date format",
                    },
                },
                type: Sequelize.DATE,
            },
            ktp: {
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        message: "KTP Number required",
                    },
                    notEmpty: {
                        args: true,
                        message: "KTP Number is not allowed to empty string",
                    },
                },
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        message: "Password required",
                    },
                    notEmpty: {
                        args: true,
                        message: "Password is not allowed to empty string",
                    },
                    min: 8,
                    not: "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
                },
                type: Sequelize.STRING,
            },
            role: {
                allowNull: false,
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("Users");
    },
};
