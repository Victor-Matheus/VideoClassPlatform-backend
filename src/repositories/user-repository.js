'use strict'

const mongoose = require("mongoose");
const User = mongoose.model("users");

exports.registerUser = async (data) => {
    const user = new User(data);
    const res = await user.save();
    return res;
}

exports.getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}

exports.getAllUsers = async () => {
    const users = await User.find({});
    return users;
}

exports.updateUser = async (data, user) => {
    user.name = data.name == null ? user.name : data.name;
    user.email = data.email == null ? user.email : data.email;
    user.password = data.password == null ? user.password : data.password;
    const res = await user.save();
    return res;
}

exports.deleteUser = async (id) => {
    const res = await User.findByIdAndDelete(id);
    return res;
}

exports.authenticate = async (email, password) => {
    const res = await User.findOne({
      email: email,
      password: password,
    });
    return res;
  };