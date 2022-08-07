const { Order, Drug, sequelize, User, Payment } = require("../models");

class Controller {
    static async getDrugOrder(req, res, next) {
        try {
            let option = {
                include: [{ model: Drug }, { model: Payment }],
            };

            const allOrders = await Order.findAll(option);
            if (!allOrders) throw { name: "notFoundOrder", message: "Order's not found" };

            res.status(200).json({ status: true, data: allOrders });
        } catch (error) {
            console.log(error);
        }
    }

    static async postDrugOrder(req, res, next) {
        const { drugId } = req.params;
        const userId = req.user.id;
        const { amount } = req.body;
        try {
            const user = await User.findByPk(userId);
            const drug = await Drug.findByPk(drugId);

            if (!user) throw { status: 401, message: "you must to login first" };
            if (!drug) throw { status: 401, message: "drug's not found" };

            if (Number(drug.stock) < 0) {
                throw { status: 402, message: "drug is empty stock" };
            }
            if (Number(drug.stock) < amount) {
                throw { status: 400, message: `there are only ${drug.stock} drugs left` };
            }
            const orderedDrug = await Order.create({ userId, drugId, amount });

            const paymentDrug = await Payment.create({ orderId: orderedDrug.id, status: "pending" });

            res.status(201).json({ status: "success make list order", orderList: orderedDrug, paymentStatus: paymentDrug.status });
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }
    static async updatePayment(req, res, next) {
        const { orderId } = req.params;
        try {
            let option = {
                where: { orderId },
                include: [Order],
            };
            const payment = await Payment.findOne(option);
            if (!payment) throw { status: 404, message: "order payment not found" };

            const drug = await Drug.findOne({ where: { id: payment.Order.drugId } });

            const leftDrug = Number(drug.stock) - Number(payment.Order.amount);

            const updatedPayment = await Payment.update(
                { status: "paid" },
                {
                    where: { orderId },
                    returning: true,
                }
            );
            const updatedDrugStock = await Drug.update(
                { stock: leftDrug },
                {
                    where: { id: payment.Order.drugId },
                    returning: true,
                }
            );

            res.status(201).json({ payment: updatedPayment, drug: updatedDrugStock });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;
