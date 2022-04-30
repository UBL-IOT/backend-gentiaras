const bcrypt = require("bcrypt");
const { requestResponse } = require("../utils");
var path = require("path");
var scriptName = path.basename(__filename);
const filename = scriptName.split("_");
let model = require("../models/" + filename[0] + "_model");
let response;

const create = async (data) => {

  const cekData = await model.findOne({ NAMA: data.NAMA }, { _id: false }, { lean: true });

  if (cekData !== undefined && cekData !== null) {
    response = { ...requestResponse.unprocessable_entity };
    response.message = "Jenis Laporan ini sudah terdaftar.";
    return response;
  }

  await model.create(data);

  return { ...requestResponse.success, data: model };
};

const get = async (condition) => {
  return model.find(condition, { _id: false }, { lean: true });
};

const getById = async (condition) => {
  return model.findOne(condition, { _id: false }, { lean: true });
};

const updateOne = async (condition , body) => {
  return model.updateOne(condition, body)
  // return model.findOne(condition, { _id: false }, { lean: true });
};

const deleteOne = async (condition ) => {
  return model.deleteOne(condition)
  // return model.findOne(condition, { _id: false }, { lean: true });
};

module.exports = {
  create,
  updateOne,
  deleteOne,
  get,
  getById
};
