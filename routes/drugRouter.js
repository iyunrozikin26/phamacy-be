const drugRouter = require("express").Router();
const Controller = require("../controllers/drugConstroller");
const { authentication, adminAccess } = require("../middlewares/auth");

drugRouter.get("/", Controller.getAllDrugs);
drugRouter.post("/", authentication, adminAccess, Controller.postDrug);
drugRouter.put("/:drugId/edit", authentication, adminAccess, Controller.editDrug);
drugRouter.delete("/:drugId/delete", authentication, adminAccess, Controller.deleteDrug);

module.exports = drugRouter;
