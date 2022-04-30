const express = require("express");
const router = express.Router();
var path = require('path');
var scriptName = path.basename(__filename);
// const filename = scriptName.split('.');
const controllers = require("../controllers/area_controller");

const { checkRequest, requiredRequest } = require("../utils");

router.get(
    "/prov",
    checkRequest(requiredRequest.authorization),
    controllers.getProv
);
router.get(
    "/kab/:id",
    // checkRequest(requiredRequest.authorization),
    controllers.getKab
);
router.get(
    "/kec/:id",
    // checkRequest(requiredRequest.authorization),
    controllers.getKec
);
router.get(
    "/desa/:id",
    // checkRequest(requiredRequest.authorization),
    controllers.getDesa
);
 

module.exports = router;
