"use strict";

const mongoose = require("mongoose");
const EDbStatusReturn = require("../enums/EDbStatusReturn");
const Module = mongoose.model("classModules");
const _leassonRepository = require("../repositories/videoLeassons-repository");

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
  const _module = await Module.findById(id);
  await Promise.all(_module.videoLeassons.map(async (v) => {
    await _leassonRepository.deleteVideoLeasson(v);
  }))
  const res = await Module.findByIdAndDelete(id);
  return res;
};

exports.addVideoLeasson = async (moduleId, leassonId) => {
  try {
    await Module.findByIdAndUpdate(moduleId, {
      $push: { videoLeassons: leassonId },
    });
    return EDbStatusReturn.DB_SAVED_OK;
  } catch {
    return EDbStatusReturn.DB_GENERAL_EXCEPTION;
  }
};
