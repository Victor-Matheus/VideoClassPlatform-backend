'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
      type: String,
      required: true,
    },
    classNotes: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: true,
    },
  });
  
  module.exports = mongoose.model("videoLeassons", schema);
  