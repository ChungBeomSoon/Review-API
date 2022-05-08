const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIdSetter = require("./auto-id-setter");

const shopSchema = new Schema({
    shopName: { type: String, required: true, unique: true },
    shopType: { type: String, required: true },
    location: { type: String, required: true },
});

autoIdSetter(shopSchema, mongoose, "application", "shop_id");
module.exports = mongoose.model("shopList", shopSchema);
