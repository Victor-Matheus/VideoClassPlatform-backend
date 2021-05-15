'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false
    },
    videoLeassons: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "videoLeassons",
      required: false,
    }],
  });
  
  module.exports = mongoose.model("classModules", schema);