const express = require("express");
const router = express.Router();
var path = require('path');
var scriptName = path.basename(__filename);
const filename = scriptName.split('.');
const controllers = require("../controllers/"+filename[0]+"_controller");

const { checkRequest, requiredRequest } = require("../utils");

router.post(
    "/create",
    checkRequest(requiredRequest.authorization),
    controllers.create
);

router.get(
    "/",
    checkRequest(requiredRequest.authorization),
    controllers.get
);

router.get(
    "/:guid",
    checkRequest(requiredRequest.authorization),
    controllers.getByUser
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
