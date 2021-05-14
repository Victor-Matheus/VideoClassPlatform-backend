"use strict";

const _repository = require("../repositories/user-repository");
const EResponseValidate = require("../enums/EResponseValidate");
const validation = require("../services/inputValidations");

exports.RegisterUser = async (req, res) => {
  const data = req.body;

  if (validation.nameValidation(data.name) === EResponseValidate.invalid) {
    return res.status(400).send({
      message: "The name must contain at least 3 characters",
    });
  }

  if (validation.emailValidation(data.email) === EResponseValidate.invalid) {
    return res.status(400).send({
      message: "Invalid email",
    });
  }

//   const _email_res = await validation.emailAlreadyRegistered(data.email);
//   if (_email_res === EResponseValidate.invalid) {
//     return res.status(400).send({
//       message: "E-mail already registered",
//     });
//   }

  if (
    validation.passwordValidation(data.password) === EResponseValidate.invalid
  ) {
    return res.status(400).send({
      message: "the password must contain at least 6 characters",
    });
  }
  try {
    var _res = await _repository.registerUser(data);
    res.status(201).send({ message: "user registered", item: _res });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.GetUserById = async (req, res) => {};

exports.DeleteUser = async (req, res) => {};

exports.UpdateUser = async (req, res) => {};

exports.GetAllUsers = async (req, res) => {};
