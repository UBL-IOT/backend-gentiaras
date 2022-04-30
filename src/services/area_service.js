require("dotenv").config();
const { requestResponse } = require("../utils");
const prov = require("../models/provinsi_model");
const kab = require("../models/kabupaten_model");
const kec = require("../models/kecamatan_model");
const desa = require("../models/desa_model");

let response;

const getProvinsi = async (condition) => {
  return prov.find(condition, { _id: false }, { lean: true });
};
const getKabupaten = async (condition) => {
  return kab.find(condition, { _id: false }, { lean: true });
};

const getKecamatan = async (condition) => {
  return kec.find(condition, { _id: false }, { lean: true });
};

const getDesa = async (condition) => {
  return desa.find(condition, { _id: false }, { lean: true });
};
module.exports = {
  getProvinsi,
  getKabupaten,
  getKecamatan,
  getDesa
};
