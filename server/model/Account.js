const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AccountSchema = new mongoose.Schema({
  email: { type: String, required: false},
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  accountType: { type: String, default: "client" },
  avatar: { type: String },
  isActive: { type: Boolean, default: false },
  verifyToken: String,
  createdAt: { type: Number, default: Date.now }
});

AccountSchema.pre("save", async function (next) {
  const account = this;// obj user
  if (!account.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(account.password, salt);
  account.password = hash;
  next();
});


const Account = mongoose.model("Account", AccountSchema, "Account")

module.exports = {
  AccountSchema, Account
}