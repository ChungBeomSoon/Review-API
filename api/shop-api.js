const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const { NotFoundError, InputError, DuplicateError } = require("./error-handler");

router.get("/shops", async (req, res) => {
    res.send(await Shop.find({}));
});

router.post("/shops", async (req, res, next) => {
    try {
        const shop = new Shop();
        shop.shopName = req.body.shopName;
        shop.shopType = req.body.shopType;
        shop.location = req.body.location;

        await shop.save();
        res.status(200).send(shop);
    } catch (err) {
        return next(err);
    }
});

router.get("/shops/:id", async (req, res, next) => {
    try {
        const targetShop = await Shop.findOne({ id: req.params.id });
        if (!targetShop) {
            throw new NotFoundError();
        }
        res.status(200).send(targetShop);
    } catch (err) {
        return next(err);
    }
});

router.put("/shops/:id", async (req, res, next) => {
    try {
        const targetShop = await Shop.findOne({ id: req.params.id });
        if (!targetShop) {
            throw new NotFoundError();
        }
        targetShop.shopName = req.body.shopName;
        targetShop.shopType = req.body.shopType;
        targetShop.location = req.body.location;

        await targetShop.save();
        return res.status(200).send(targetShop);
    } catch (err) {
        return next(err);
    }
});

router.delete("/shops/:id", async (req, res, next) => {
    try {
        const targetShop = await Shop.findOne({ id: req.params.id });
        const deleteShop = await Shop.deleteOne({ id: req.params.id });
        if (deleteShop.deletedCount === 1) {
            return res.status(200).send({ id: targetShop.id, shopName: targetShop.shopName, shopType: targetShop.shopType, location: targetShop.location });
        } else {
            return new NotFoundError();
        }
    } catch (err) {
        return next(err);
    }
});

router.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(404).json({ message: err.message });
});

module.exports = router;
