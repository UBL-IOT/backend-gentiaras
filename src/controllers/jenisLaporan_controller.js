const path = require("path");
const scriptName = path.basename(__filename);
const filename = scriptName.split("_");
const service = require("../services/" + filename[0] + "_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const joi = require("joi");
const { v4, validate: isUuid } = require("uuid");
let response;

const create = async (req, res) => {

  try {
    req.body.GUID = v4()
    req.body.INSTANSI = req.instansi
    const data = await service.create(req.body);
    response = { ...data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const get = async (req, res) => {

  try {
    const data = await service.get({INSTANSI : req.instansi});
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getById = async (req, res) => {
  try {
    const data = await service.getById({GUID : req.params.guid});
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const updateOne = async (req, res) => {
  try {
    const data = await service.updateOne({ GUID: req.params.guid },req.body);
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};


const deleteOne = async (req, res) => {
  try {
    const data = await service.deleteOne({ GUID: req.params.guid });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

module.exports = {
  create,
  get,
  getById,
  updateOne,
  deleteOne
};
