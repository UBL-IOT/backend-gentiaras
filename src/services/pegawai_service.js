const bcrypt = require("bcrypt");
const { requestResponse } = require("../utils");
var path = require("path");
var scriptName = path.basename(__filename);
const filename = scriptName.split("_");
let model = require("../models/" + filename[0] + "_model");
let user = require("../models/user_model");
let response;

const create = async (data) => {
  const kodeInstansi = data.GUID
  const cekData = await model.findOne({ NIK: data.NIK }, { _id: false }, { lean: true });

  if (cekData !== undefined && cekData !== null) {
    response = { ...requestResponse.unprocessable_entity };
    response.message = "Pegawai dengan nik ini sudah terdaftar.";
    return response;
  }
  const pass = "pegawai123";
  const saltRounds = 12;
  const hashPassword = await bcrypt.hash(pass, saltRounds);
  data.PASSWORD = hashPassword;
  data.USERNAME = data.NIK
  // data.ROLE = "Karyawan"
  // data.NAMA_INSTANSI = namaInstansi

  await model.create(data);
  await user.create(data)

  return { ...requestResponse.success, data: model };
};

const get = async (condition) => {
  // return model.find(condition, { _id: false }, { lean: true });
  return model.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: "unit",
        localField: "UNIT",
        foreignField: "GUID",
        as: "unit"
      }
    },
    {
      $unwind:
      {
        path: "$unit",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "user",
        localField: "NIK",
        foreignField: "USERNAME",
        as: "USERS"
      }
    },
    {
      $unwind:
      {
        path: "$USERS",
        preserveNullAndEmptyArrays: true
      }
    }
  ])
};

const getById = async (condition) => {
  return model.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: "unit",
        localField: "UNIT",
        foreignField: "GUID",
        as: "unit"
      }
    },
    {
      $unwind:
      {
        path: "$unit",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "user",
        localField: "NIK",
        foreignField: "USERNAME",
        as: "USERS"
      }
    },
    {
      $unwind:
      {
        path: "$USERS",
        preserveNullAndEmptyArrays: true
      }
    }
  ])

};

const updateOne = async (condition, body) => {
  // console.log(body)
  await model.updateOne(condition, body)
  await user.updateOne(condition, {ROLE : body.ROLE})

  // return model.findOne(condition, { _id: false }, { lean: true });
};

const deleteOne = async (condition) => {
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
