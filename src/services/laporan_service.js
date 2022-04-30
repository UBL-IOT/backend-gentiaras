const bcrypt = require("bcrypt");
const { requestResponse } = require("../utils");
var path = require("path");
var scriptName = path.basename(__filename);
const filename = scriptName.split("_");
let model = require("../models/" + filename[0] + "_model");
let user = require("../models/user_model");
let response;

const create = async (data) => {
  // const cekData = await model.findOne({ NIK: data.NIK }, { _id: false }, { lean: true });

  // if (cekData !== undefined && cekData !== null) {
  //   response = { ...requestResponse.unprocessable_entity };
  //   response.message = "Pegawai dengan nik ini sudah terdaftar.";
  //   return response;
  // }

  // data.NAMA_INSTANSI = namaInstansi
  // data.TIMESTAMP = new Date().toISOString()
  await model.create(data);

  return { ...requestResponse.success, data: model };
};

const get = async (condition, filter) => {
  // return model.find(condition, { _id: false }, { lean: true });
  // return model.aggregate([
  //   { $match: condition },
  //   {
  //       $lookup: {
  //           from: "jabatan",
  //           localField: "JABATAN",
  //           foreignField: "GUID",
  //           as: "unit"
  //       }
  //   },
  //   {
  //     $unwind:
  //     {
  //         path: "$unit",
  //         preserveNullAndEmptyArrays: true 
  //     }
  // }
  // ])
  let newQuery = {}
  if (filter.NAME !== "" && filter.NAME !== undefined && filter.NAME !== "null") {
    Object.assign(newQuery, {
      "PEGAWAI.NAME": { $regex: new RegExp("^" + filter.NAME, "i") }
    })
  }
  if (filter.UNIT !== "" && filter.UNIT !== undefined && filter.UNIT !== "null") {
    Object.assign(newQuery, {
      "UNIT.GUID": { $regex: new RegExp("^" + filter.UNIT, "i") }
    })
  }
  if (filter.STARTDATE !== "" && filter.STARTDATE !== undefined && filter.STARTDATE !== "null") {
    startDate = new Date(`${filter.STARTDATE} 00:01`)
    Object.assign(newQuery, {
      CREATED_AT: { "$gte": startDate}
    })
  }
  if (filter.ENDDATE !== "" && filter.ENDDATE !== undefined && filter.ENDDATE !== "null") {
    startDate = new Date(filter.STARTDATE)
    endDate = new Date(`${filter.ENDDATE} 23:59`)
    Object.assign(newQuery, {
      // CREATED_AT: { "$gte": new Date(filter.STARTDATE), "$lte": new Date(filter.ENDDATE)}
      CREATED_AT  : { $gte : startDate, $lte : endDate } 
       
    })
  }
  console.log(filter)
  const count = await model
    .aggregate([
      {
        $match: condition
      },
      {
        $lookup: {
          from: "pegawai",
          localField: "USERNAME",
          foreignField: "NIK",
          as: "PEGAWAI"
        }
      },
      {
        $unwind:
        {
          path: "$PEGAWAI",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "unit",
          localField: "PEGAWAI.UNIT",
          foreignField: "GUID",
          as: "UNIT"
        }
      },
      {
        $unwind:
        {
          path: "$UNIT",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: newQuery
      },
      { $group: { _id: null, count: { $sum: 1 } } }
    ])
  const query = await model
    .aggregate([
      {
        $match: condition
      },
      {
        $lookup: {
          from: "pegawai",
          localField: "USERNAME",
          foreignField: "NIK",
          as: "PEGAWAI"
        }
      },
      {
        $unwind:
        {
          path: "$PEGAWAI",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "unit",
          localField: "PEGAWAI.UNIT",
          foreignField: "GUID",
          as: "UNIT"
        }
      },
      {
        $unwind:
        {
          path: "$UNIT",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "jenisLaporan",
          localField: "JENISLAPORAN",
          foreignField: "GUID",
          as: "JENISLAPORAN"
        }
      },
      {
        $unwind:
        {
          path: "$JENISLAPORAN",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: newQuery
      }
    ])
    .skip(Number(filter.rowsPerPage) * Number(filter.page) - Number(filter.rowsPerPage))
    .limit(Number(filter.rowsPerPage))
    .sort({ _id: -1 })
    const result = {
      ...requestResponse.success,
      result: {
        paginate: {
          page: Number(filter.page),
          rowsPerPage: Number(filter.rowsPerPage),
          rowsNumber: count.length >0 ? count[0].count:0
        },
        data: query
      }

    };
  
  return result
};

const getById = async (condition) => {
  return model.aggregate([
    { $match: condition },
    {
      $lookup: {
        from: "jabatan",
        localField: "JABATAN",
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
    }
  ])

};

const updateOne = async (condition, body) => {
  return model.updateOne(condition, body)
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
