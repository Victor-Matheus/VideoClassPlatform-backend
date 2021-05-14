'use strict'

const mongoose = require("mongoose");
const User = mongoose.model("users");

exports.registerUser = async (data) => {
    const user = new User(data);
    const res = await user.save();
    return res;
}