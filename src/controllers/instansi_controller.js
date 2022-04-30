const service = require("../services/instansi_service");
// const InstitutionService = require("../services/institusi_service");
// const ProfileService = require("../services/institution_profile_service");

const fileService = require("../services/file_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const joi = require("joi");
const { v4, validate: isUuid } = require("uuid");
const Promise = require("bluebird");
const formidable = Promise.promisifyAll(require("formidable"), { multiArgs: true });
const form = formidable();
let response;

const registration = async (req, res) => {
  try {
    const [fields, files] = await form.parseAsync(req);
    fields.GUID = v4();
    let fileName;
    console.log(files.image.name)
    const dateNow = ~~(new Date() / 1000);
    if (files.image.name !== undefined) {
      fileName = `${fields.GUID}--${dateNow}-.${fileService.getFileExtension(files.image.name)}`;
      const oldPath = files.image.path;
      const newPath = `${process.env.IMAGE_PATH}/${fileName}`;
      await fileService.moveFile(oldPath, newPath);
    } else {
      fileName = "-";
    }
    const body = JSON.parse(fields.data)
    body.LOGO = fileName
    body.GUID = v4()
    const user = await service.register(body);
    response = { ...user };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const get = async (req, res) => {
  try {
    const data = await service.get();
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getById = async (req, res) => {
  try {
    const data = await service.getById({GUID : req.params.guid});
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const updateOne = async (req, res) => {
  // try {
  //   const data = await service.updateOne({ GUID: req.params.guid });
  //   response = { ...requestResponse.success, data };
  // } catch (error) {
  //   logger.error(error);
  //   response = { ...requestResponse.server_error };
  // }
  // res.json(response);

  try {
    const [fields, files] = await form.parseAsync(req);
    let fileName;
    const dateNow = ~~(new Date() / 1000);
    if (files.length !== undefined) {
      fileName = `${fields.GUID}--${dateNow}-.${fileService.getFileExtension(files.image.name)}`;
      const oldPath = files.image.path;
      const newPath = `${process.env.IMAGE_PATH}/${fileName}`;
      await fileService.moveFile(oldPath, newPath);
      body.LOGO = fileName
    } 
    const body = JSON.parse(fields.data)
    const user = await service.updateOne({GUID : req.params.guid},body);
    response = { ...user };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};


const deleteOne = async (req, res) => {
  try {
    const data = await service.deleteOne({ GUID: req.params.guid });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

module.exports = {
  registration,
  get,
  getById,
  updateOne,
  deleteOne
};
