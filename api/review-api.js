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
        if (req.body.shopName === undefined) {
            throw new InputError("'shopName' parameter is empty.");
        }
        if (req.body.author === undefined) {
            throw new InputError("'author parameter is empty.");
        }

        if (req.body.date === undefined) {
            review.date = getToday();
        } else {
            review.date = req.body.date;
        }

        const checkReview = await Review.findOne({ shopName: req.body.shopName });

        if (checkReview) {
            throw new DuplicateError();
        }
        const review = new Review();
        review.shopName = req.body.shopName;
        review.author = req.body.author;
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
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid review id.");
        }
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
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid review id.");
        }
        if (req.body.shopName === undefined) {
            throw new InputError("'shopName' parameter is empty.");
        }
        if (req.body.author === undefined) {
            throw new InputError("'author parameter is empty.");
        }
        if (req.body.date === undefined) {
            review.date = getToday();
        } else {
            review.date = req.body.date;
        }

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
        if (isNaN(parseInt(req.params.id))) {
            throw new InputError("Invalid review id.");
        }
        const targetReview = await Review.findOne({ id: req.params.id });
        if (!targetReview) {
            throw new NotFoundError();
        }
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
    res.status(err.status).json({ message: err.message });
});

function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (1 + today.getMonth())).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

module.exports = router;
