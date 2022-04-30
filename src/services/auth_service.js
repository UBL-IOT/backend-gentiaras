require("dotenv").config();
const user = require("../models/user_model");
const pegawai = require("../models/pegawai_model");
const { requestResponse } = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");
const privateKey = readFileSync("./private.key", "utf-8");

let response;
let profile ;
const login = async ({ username, password }) => {
  const admin = await user.findOne({ USERNAME: username }, { _id: false }, { lean: true });
  if (admin === null) {
    response = { ...requestResponse.loginFailure };

    return response;
  }

  const comparePassword = await bcrypt.compare(password, admin.PASSWORD);
  if (!comparePassword) {
    console.log("a");
    return { ...requestResponse.loginFailure };
  }
  if (admin.ROLE === "Karyawan" || admin.ROLE === "Pimpinan") {
    profile = await user.findOne({ USERNAME: username }, { _id: false }, { lean: true });
  }
  const token = jwt.sign(
    {
      guid: admin.GUID,
      instansi: admin.INSTANSI,
      ...(admin.EMAIL && { email: admin.EMAIL }),
      ...(admin.USERNAME && { username: admin.USERNAME }),
      ...(admin.PASSWORD && { password: admin.PASSWORD })
      // ...(admin.INSTITUSI_CODE && { institusi_code: admin.INSTITUSI_CODE })
    },
    privateKey,
    {
      algorithm: "RS256"
    },
    {
      expiresIn: "7d"
    }
  );
  // console.log(admin.INSTITUSI_CODE)

  const result = {
    ...requestResponse.success,
    data: {
      user: admin,
      token,
      profile : profile ? profile : null,
    }

  };
  return result;
};

module.exports = {
  login
};
