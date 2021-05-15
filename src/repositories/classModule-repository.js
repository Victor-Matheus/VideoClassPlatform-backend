"use strict";

const mongoose = require("mongoose");
const Module = mongoose.model("classModules");

exports.registerClassModule = async (data) => {
  const module = new Module(data);
  const res = await module.save();
  return res;
};

exports.getClassModuleById = async (id) => {
  const module = await Module.findById(id);
  return module;
};

exports.getAllClassModules = async () => {
  const modules = await Module.find({});
  return modules;
};

exports.updateClassModule = async (data, module) => {
  module.title = data.title == null ? module.title : data.title;
  module.description =
    data.description == null ? module.description : data.description;
  module.videoLeassons =
    data.videoLeassons == null ? module.videoLeassons : data.videoLeassons;
  const res = await module.save();
  return res;
};

exports.deleteClassModule = async (id) => {
  const res = await Module.findByIdAndDelete(id);
  return res;
};
