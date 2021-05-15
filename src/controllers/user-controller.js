"use strict";

const _repository = require("../repositories/user-repository");
const EResponseValidate = require("../enums/EResponseValidate");
const validation = require("../services/inputValidations");
const authService = require("../auth");

exports.RegisterUser = async (req, res) => {
  const data = req.body;

  if (validation.nameValidation(data.name) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "The name must contain at least 3 characters",
    });
  }

  if (validation.emailValidation(data.email) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "Invalid email",
    });
  }

  if (
    validation.passwordValidation(data.password) == EResponseValidate.invalid
  ) {
    return res.status(400).send({
      message: "the password must contain at least 6 characters",
    });
  }
  try {
    const _email_res = await validation.emailAlreadyRegistered(data.email);
    if (_email_res == EResponseValidate.invalid) {
      return res.status(400).send({
        message: "E-mail already registered",
      });
    }
    var _res = await _repository.registerUser(data);
    let _returnObject = {};
    _returnObject._id = _res._id;
    _returnObject.name = _res.name;
    _returnObject.email = _res.email;
    res.status(201).send({ message: "user registered", item: _returnObject });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.GetUserById = async (req, res) => {
  const id = req.params.id;

  try {
    var user = await _repository.getUserById(id);
    if (user != null) {
      let _returnObject = {};
      _returnObject._id = user._id;
      _returnObject.name = user.name;
      _returnObject.email = user.email;
      return res.status(200).send(_returnObject);
    }
    res.status(401).send({ message: "user not found" });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.UpdateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const email = data.email;
  const name = data.name;
  const password = data.password;

  if (name != null) {
    var _res_name = validation.nameValidation(name);
    if (_res_name == EResponseValidate.invalid)
      return res.status(400).send({
        message: "The name must contain at least 3 characters",
      });
  }

  if (password != null) {
    var _res_password = validation.passwordValidation(password);
    if (_res_password == EResponseValidate.invalid)
      return res.status(400).send({
        message: "the password must contain at least 6 characters",
      });
  }
  if (email != null) {
    var _res_email = validation.emailValidation(email);
    if (_res_email == EResponseValidate.invalid)
      return res.status(400).send({
        message: "Invalid E-mail",
      });
  }

  try {
    if (email != null) {
      var _res_email_in_use = await validation.emailAlreadyRegistered(email);
      if (_res_email_in_use == EResponseValidate.invalid)
        return res.status(400).send({
          message: "E-mail already registered",
        });
    }
    var _user = await _repository.getUserById(id);
    if (_user == null)
      return res.status(404).send({
        message: "user not found",
      });
    var _responseObject = await _repository.updateUser(data, _user);
    res.status(200).send({
      message: "user updated successfully",
      item: _responseObject,
    });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.DeleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const _user = await _repository.getUserById(id);
    if (_user == null)
      return res.status(401).send({
        message: "User not found",
      });
    const _res = await _repository.deleteUser(id);
    res.status(200).send({
      message: "user successfully removed",
      item: _res,
    });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.GetAllUsers = async (req, res) => {
  try {
    let _returnList = [];
    var _users = await _repository.getAllUsers();
    if (_users.length > 0) {
      await Promise.all(
        _users.map(async (value) => {
          let _object = {};
          _object.id = value._id;
          _object.name = value.name;
          _object.email = value.email;
          _returnList.push(_object);
        })
      );
    }
    res.status(200).send(_returnList);
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.authenticate = async (req, res) => {
  const data = req.body;
  try {
    const _user = await _repository.authenticate(data.email, data.password);

    if (!_user) {
      return res.status(401).send({
        message: "Invalid email or password",
      });
    }

    const token = await authService.generateToken({
      _id: _user._id,
      email: _user.email,
      name: _user.name,
    });

    res.status(201).send({
      token: token,
      data: {
        email: _user.email,
        nome: _user.nomeCompleto,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "The user could not be authenticated",
    });
  }
};
