const Controller = require("../controllers/orderController");
const { authentication, adminAccess } = require("../middlewares/auth");

const orderRouter = require("express").Router();

orderRouter.get("/", Controller.getDrugOrder);
orderRouter.post("/:drugId", authentication, Controller.postDrugOrder);
orderRouter.put("/:orderId", authentication, adminAccess, Controller.updatePayment);

module.exports = orderRouter;
