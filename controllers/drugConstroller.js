const { Drug, User, Order, Payment } = require("../models");

class Controller {
    static async getAllDrugs(req, res, next) {
        try {
            const allDrugs = await Drug.findAll();
            res.status(200).json({ status: true, data: allDrugs });
        } catch (error) {
            console.log(error);
        }
    }

    static async postDrug(req, res, next) {
        let { name, price, stock } = req.body;
        try {
            const newDrugItem = {
                name,
                price: +price,
                stock: +stock,
            };

            const createdNewDrugItem = await Drug.create(newDrugItem);
            res.status(201).json({ status: "created", data: createdNewDrugItem });
        } catch (error) {
            console.log(error);
        }
    }

    static async editDrug(req, res, next) {
        const { drugId } = req.params;
        const { name, price, stock } = req.body;
        try {
            const getDrugItem = await Drug.findByPk(drugId);
            if (!getDrugItem) throw { name: "notFoundDrug", message: "Drug item is not found" };

            const updateInput = {
                name,
                price: +price,
                stock: +stock,
            };

            const updatedDrugItem = await Drug.update(updateInput, {
                where: { id: drugId },
                returning: true,
            });
            res.status(201).json(updatedDrugItem);
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteDrug(req, res, next) {
        const { drugId } = req.params;
        try {
            const getDrugItem = await Drug.findByPk(drugId);
            if (!getDrugItem) throw { name: "notFoundDrug", message: "Drug item is not found" };
            const deletedDrugItem = await Drug.destroy({
                where: { id: drugId },
            });
            res.status(201).json({ status: `drug with id ${drugId} has been deleted` });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;
