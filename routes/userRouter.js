const Controller = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/registerPatient", Controller.postRegisterPatient);
userRouter.post("/loginPatient", Controller.postLoginPatient);

module.exports = userRouter;
