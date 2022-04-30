const express = require("express");
const router = express.Router();
var path = require('path');
var scriptName = path.basename(__filename);
// const filename = scriptName.split('.');
const controllers = require("../controllers/instansi_controller");

const { checkRequest, requiredRequest } = require("../utils");

router.post(
    "/register",
    // checkRequest(requiredRequest.authorization),
    controllers.registration
);

router.get(
    "/",
    checkRequest(requiredRequest.authorization),
    controllers.get
);
router.get(
    "/:guid",
    checkRequest(requiredRequest.authorization),
    controllers.getById
);
router.put(
    "/:guid",
    checkRequest(requiredRequest.authorization),
    controllers.updateOne
);

router.delete(
    "/:guid",
    checkRequest(requiredRequest.authorization),
    controllers.deleteOne
);
 

module.exports = router;
