const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { requestResponse } = require("../utils/index");
const instansi = require("./instansi");
const area = require("./area");
const jenisLaporan = require("./jenisLaporan");
const unit = require("./unit");
const pegawai = require("./pegawai");
const laporan = require("./laporan");


let response;

router.get(
  "/",
  (req, res) => {
    response = requestResponse.success;
    response.message = "Aksi Gentiaras - API!";
    res.status(response.code).json(response);
  }
);
router.post(
  "/users/login",
  authController.login
);


router.use("/instansi", instansi);
router.use("/laporan", laporan);
router.use("/area", area);
router.use("/jenisLaporan", jenisLaporan);
router.use("/unit", unit);
router.use("/pegawai", pegawai);

module.exports = router;
