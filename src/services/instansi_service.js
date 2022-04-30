const bcrypt = require("bcrypt");
const model = require("../models/user_model");
const instansi = require("../models/instansi_model");
const { requestResponse } = require("../utils");

let response;

const register = async (data) => {
  console.log(data)
  const namaInstansi = data.INSTANSI
  const kodeInstansi = data.GUID
  // const cekData = await model.findOne({ USERNAME: data.USERNAME }, { _id: false }, { lean: true });
  const cekDataInstansi = await instansi.findOne({ NAMA_INSTANSI: data.NAMA_INSTANSI}, { _id: false }, { lean: true });

  if (cekDataInstansi !== undefined && cekDataInstansi !== null) {
    response = { ...requestResponse.unprocessable_entity };
    response.message = "Instansi ini sudah terdaftar.";
    return response;
  }
  const pass = "admin123";
  const saltRounds = 12;
  const hashPassword = await bcrypt.hash(pass, saltRounds);
  data.PASSWORD = hashPassword;
  data.INSTANSI = kodeInstansi
  // data.NAMA_INSTANSI = namaInstansi

  await model.create(data);
  await instansi.create(data)

  return { ...requestResponse.success, data: model };
};

const get = async () => {
  return instansi.find({}, { _id: false }, { lean: true });
};

const getById = async (condition) => {
  return instansi.findOne(condition, { _id: false }, { lean: true });
};

const updateOne = async (condition , body) => {
  console.log(body)
  return instansi.updateOne(condition, body)
  // return model.findOne(condition, { _id: false }, { lean: true });
};

const deleteOne = async (condition ) => {
  return instansi.deleteOne(condition)
  // return model.findOne(condition, { _id: false }, { lean: true });
};

module.exports = {
  register,
  updateOne,
  deleteOne,
  get,
  getById
};
