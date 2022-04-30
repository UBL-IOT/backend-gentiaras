const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const joi = require("joi");
const { v4, validate: isUuid } = require("uuid");
const path = require("path");
const scriptName = path.basename(__filename);
const filename = scriptName.split("_");
const service = require("../services/" + filename[0] + "_service");
let response;


const getProv = async (req, res) => {
  console.log(req.headers)
  try {
    const data = await service.getProvinsi();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getKab = async (req, res) => {
  try {
    const data = await service.getKabupaten({id_prov : req.params.id});
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getKec = async (req, res) => {
  try {
    const data = await service.getKecamatan({id_kab : req.params.id});
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getDesa = async (req, res) => {
  try {
    const data = await service.getDesa({id_kec : req.params.id});
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};


module.exports = {
  getProv,
  getKab,
  getKec,
  getDesa
};
