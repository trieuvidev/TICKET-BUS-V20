const mongoose = require("mongoose");

const FacebookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uid: String,
    access_token: String,
    email: { type: String, trim: true },
    isActive: {type: Boolean, default: true},
    accountType: { type: String, default: "client" },
    createdAt: { type: Number, default: Date.now }
});

const Facebook = mongoose.model("Facebook", FacebookSchema, "Facebook")

module.exports = {
    FacebookSchema, Facebook
}
