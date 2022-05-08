const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Review = require("../models/review");
const { NotFoundError, InputError, DuplicateError } = require("./error-handler");

router.get("/reviews", async (req, res) => {
    res.send(await Review.find({}));
});

router.post("/reviews", async (req, res, next) => {
    try {
        const checkReview = await Review.findOne({ shop: req.body.shop });
        const review = new Review();
        review.shopName = req.body.shopName;
        review.author = req.body.author;
        review.date = req.body.date;
        review.description = req.body.description;
        review.keyword = req.body.keyword;

        await review.save();
        res.status(200).send(review);
    } catch (err) {
        return next(err);
    }
});

router.get("/reviews/:id", async (req, res, next) => {
    try {
        const targetReview = await Review.findOne({ id: req.params.id });
        if (!targetReview) {
            throw new NotFoundError();
        }
        res.status(200).send(targetReview);
    } catch (err) {
        return next(err);
    }
});

router.put("/reviews/:id", async (req, res, next) => {
    try {
        const targetReview = await Review.findOne({ id: req.params.id });
        if (!targetReview) {
            throw new NotFoundError();
        }
        targetReview.shopName = req.body.shopName;
        targetReview.author = req.body.author;
        targetReview.date = req.body.date;
        targetReview.description = req.body.description;
        targetReview.keyword = req.body.keyword;

        await targetReview.save();
        return res.status(200).send(targetReview);
    } catch (err) {
        return next(err);
    }
});

router.delete("/reviews/:id", async (req, res, next) => {
    try {
        const targetReview = await Review.findOne({ id: req.params.id });
        const deleteReview = await Review.deleteOne({ id: req.params.id });
        if (deleteReview.deletedCount === 1) {
            res.status(200).send({ id: targetReview.id, shopName: targetReview.shopName, author: targetReview.author });
        } else {
            throw new NotFoundError();
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
