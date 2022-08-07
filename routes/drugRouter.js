const drugRouter = require("express").Router();
const Controller = require('../controllers/drugConstroller')

drugRouter.get("/", Controller.getAllDrugs);
drugRouter.post("/", Controller.postDrug);
drugRouter.put("/:drugId/edit", Controller.editDrug);
drugRouter.delete("/:drugId/delete", Controller.deleteDrug);

module.exports = drugRouter;
