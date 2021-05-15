"use strict";

const mongoose = require("mongoose");
const Leasson = mongoose.model("videoLeassons");
const Module = mongoose.model("classModules");

exports.registerVideoLeasson = async (data) => {
  const leasson = new Leasson(data);
  const res = await leasson.save();
  return res;
};

exports.getVideoLeassonById = async (id) => {
  const leasson = await Leasson.findById(id);
  return leasson;
};

exports.getAllVideoLeassons = async () => {
  const leassons = await Leasson.find({});
  return leassons;
};

exports.updateVideoLeasson = async (data, leasson) => {
  leasson.title = data.title == null ? leasson.title : data.title;
  leasson.classNotes =
    data.classNotes == null ? leasson.classNotes : data.classNotes;
  leasson.link =
    data.link == null ? leasson.link : data.link;
  const res = await leasson.save();
  return res;
};

exports.deleteVideoLeasson = async (id) => {
  await Module.findOneAndUpdate(
    { videoLeassons: id },
    { $pull: { "videoLeassons": id } },
    { new: true }
  );
  const res = await Leasson.findByIdAndDelete(id);
  return res;
};
