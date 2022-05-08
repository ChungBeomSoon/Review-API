const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const { NotFoundError, InputError, DuplicateError } = require("./error-handler");

router.get("/shops", async (req, res) => {
    res.send(await Shop.find({}));
});

router.post("/shops", async (req, res, next) => {
    try {
        if (req.body.shopName === undefined) {
            throw new InputError("'shopName parameter is empty.");
        }
        if (req.body.shopType === undefined) {
            throw new InputError("'shopType' parameter is empty.");
        }
        if (req.body.location === undefined) {
            throw new InputError("'location' parameter is empty.");
        }

        const checkShop = await Shop.findOne({ shopName: req.body.shopName });
        if (checkShop) {
            throw new DuplicateError("Shop");
        }

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
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid shop id.");
        }
        const targetShop = await Shop.findOne({ shop_id: req.params.id });
        if (!targetShop) {
            throw new NotFoundError("Shop");
        }
        res.status(200).send(targetShop);
    } catch (err) {
        return next(err);
    }
});

router.put("/shops/:id", async (req, res, next) => {
    try {
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid shop id.");
        }
        if (req.body.shopName === undefined) {
            throw new InputError("'shopName' parameter is empty.");
        }
        if (req.body.shopType === undefined) {
            throw new InputError("'shopType' parameter is empty.");
        }
        if (req.body.location === undefined) {
            throw new InputError("'location' parameter is empty.");
        }

        const targetShop = await Shop.findOne({ shop_id: req.params.id });
        if (!targetShop) {
            throw new NotFoundError("Shop");
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
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid shop id.");
        }
        const targetShop = await Shop.findOne({ shop_id: req.params.id });
        if (!targetShop) {
            throw new NotFoundError("Shop");
        }
        const deleteShop = await Shop.deleteOne({ shop_id: req.params.id });
        if (deleteShop.deletedCount === 1) {
            return res.status(200).send({ shop_id: targetShop.shop_id, shopName: targetShop.shopName, shopType: targetShop.shopType, location: targetShop.location });
        } else {
            return new NotFoundError("Shop");
        }
    } catch (err) {
        return next(err);
    }
});

router.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status).json({ message: err.message });
});

module.exports = router;
