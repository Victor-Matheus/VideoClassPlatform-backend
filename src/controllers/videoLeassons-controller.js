"use strict";

const _repository = require("../repositories/videoLeassons-repository");
const _moduleRepository = require("../repositories/classModule-repository");
const EDbStatusReturn = require("../enums/EDbStatusReturn");

exports.RegisterVideoLeasson = async (req, res) => {
  const data = req.body;

  if (data.title == null)
    return res.status(400).send({
      message: "Video Leasson must contain a title",
    });

  if (data.link == null)
    return res.status(400).send({
      message: "The lesson must have a link to the video",
    });

  try {
    const _module = await _moduleRepository.getClassModuleById(data.moduleId);
    if (_module == null)
      return res.status(401).send({
        message: "Class Module not found",
      });
    const _videoLeasson = await _repository.registerVideoLeasson(data);
    const _module_response = await _moduleRepository.addVideoLeasson(
      _module._id,
      _videoLeasson._id
    );
    if (_module_response == EDbStatusReturn.DB_SAVED_OK)
      return res.status(201).send({
        message: "Video Leasson registered successfully",
        item: _videoLeasson,
      });
    else {
      await _repository.deleteVideoLeasson(_videoLeasson._id);
      return res.status(500).send({
        message:
          "It was not possible to register the lesson in the given module",
      });
    }
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.UpdateVideoLeasson = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    var _leasson = await _repository.getVideoLeassonById(id);
    if (_leasson == null)
      return res.status(401).send({
        message: "Video Leasson not found",
      });
    var _updated_leasson = await _repository.updateVideoLeasson(data, _leasson);
    res.status(200).send({
      message: "Video Leasson updated successfully",
      item: _updated_leasson,
    });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.GetVideoLeassonById = async (req, res) => {
  const id = req.params.id;

  try {
    const _videoLeasson = _repository.getVideoLeassonById(id);
    if (_videoLeasson == null)
      return res.status(401).send({
        message: "Video leasson not found",
      });
    res.status(200).send(_videoLeasson);
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.GetAllVideoLeassonsFromModule = async (req, res) => {
  const moduleId = req.params.id;

  try {
    const _module = await _moduleRepository.getClassModuleById(moduleId);
    if (_module == null)
      return res.status(401).send({
        message: "Class Module not found",
      });
    let _returnList = [];
    await Promise.all(
      _module.videoLeassons.map(async (v) => {
        let leasson = await _repository.getVideoLeassonById(v);
        _returnList.push(leasson);
      })
    );
    res.status(200).send(_returnList);
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};

exports.DeleteVideoLeasson = async (req, res) => {
  const id = req.params.id;
  try {
    const _leasson = await _repository.getVideoLeassonById(id);
    if (_leasson == null)
      return res.status(401).send({
        message: "Video Leasson not found",
      });
    const _response = await _repository.deleteVideoLeasson(id);
    res.status(200).send({
      message: "Video Leasson deleted successfully",
      item: _response,
    });
  } catch {
    res.status(500).send({ message: "An error occurred with the request" });
  }
};
