const Controller = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/registerPatient", Controller.postRegisterPatient);
userRouter.post("/login", Controller.postLoginPatient);

module.exports = userRouter;
