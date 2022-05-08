const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIdSetter = require("./auto-id-setter");

const reviewSchema = new Schema({
    shopName: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    keyword: { type: Array },
});

autoIdSetter(reviewSchema, mongoose, "application", "id");
module.exports = mongoose.model("reviewList", reviewSchema);
