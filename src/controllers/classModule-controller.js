"use strict";

const _repository = require("../repositories/classModule-repository");

exports.RegisterClassModule = async (req, res) => {
  const data = req.body;
  if (data.title == null)
    return res
      .status(400)
      .send({ message: "the class module must have a title" });
  try {
    const _module = await _repository.registerClassModule(data);
    res
      .status(201)
      .send({ message: "Class Module created successfully", item: _module });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.UpdateClassModule = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (data.title == null)
    return res
      .status(400)
      .send({ message: "the class module must have a title" });

  try {
    var _module = await _repository.getClassModuleById(id);
    if (_module == null)
      return res.status(404).send({ message: "Class Module not found" });
    var _updated_module = await _repository.updateClassModule(data, _module);
    res.status(200).send({
      message: "Class module updated successfully",
      item: _updated_module,
    });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.GetClassModuleById = async (req, res) => {
  const id = req.params.id;

  try {
    const _module = await _repository.getClassModuleById(id);
    if (_module == null)
      return res.status(404).send({ message: "Class Module not found" });
    res.status(200).send(_module);
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.GetAllClassModules = async (req, res) => {
  try {
    const _modules = await _repository.getAllClassModules();
    res.status(200).send(_modules);
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.DeleteClassModule = async (req, res) => {
  const id = req.params.id;

  try {
    const _module = await _repository.getClassModuleById(id);
    if (_module == null)
      return res.status(404).send({ message: "Class Module not found" });
    const _res = await _repository.deleteClassModule(id);
    res.status(200).send({
      message: "Class Module deleted successfully",
      item: _res,
    });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};
