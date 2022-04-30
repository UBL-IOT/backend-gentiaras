const path = require("path");
const scriptName = path.basename(__filename);
const filename = scriptName.split("_");
const service = require("../services/" + filename[0] + "_service");
const { requestResponse } = require("../utils");
const logger = require("../utils/logger");
const joi = require("joi");
const { v4, validate: isUuid } = require("uuid");
const fileService = require("../services/file_service");
const Promise = require("bluebird");
const formidable = Promise.promisifyAll(require("formidable"), { multiArgs: true });
const form = formidable();

const moment = require("moment");
let response;

const create = async (req, res) => {
  try {
   
    var tgl = moment(new Date()).format("YYYY-MM-DD")
    var currentTimeStamp = Date.parse(tgl);
    console.log(new Date().getTime())
    const [fields, files] = await form.parseAsync(req);
    fields.GUID = v4();
    let foto;
    // console.log(files.image.name)
    const dateNow = ~~(new Date() / 1000);
    if (files.foto.name !== undefined) {
      foto = `${fields.GUID}--${dateNow}-.${fileService.getFileExtension(files.foto.name)}`;
      const oldPath = files.foto.path;
      const newPath = `${process.env.IMAGE_PATH}/${foto}`;
      await fileService.moveFile(oldPath, newPath);
    } 
    const body = JSON.parse(fields.data);
    body.USERNAME = req.username
    body.FOTO = foto
    body.GUID = v4()
    body.INSTANSI = req.instansi
    console.log(body)
    const user = await service.create(body);
    response = { ...user };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const get = async (req, res) => {

  try {
    const data = await service.get({ INSTANSI: req.instansi } , req.query);
    // console.log(getQuery(req.query))
    
    response = data
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const getById = async (req, res) => {
  try {
    const data = await service.getById({ GUID: req.params.guid });
    response = { ...requestResponse.success, data };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.json(response);
};

const updateOne = async (req, res) => {
  try {
  
    const [fields, files] = await form.parseAsync(req);
    let foto, fotoktp;
    const dateNow = ~~(new Date() / 1000);
    let body = JSON.parse(fields.data)
    if (files.foto !== undefined) {
      foto = `${fields.GUID}--${dateNow}-.${fileService.getFileExtension(files.foto.name)}`;
      const oldPath = files.foto.path;
      const newPath = `${process.env.IMAGE_PATH}/${foto}`;
      await fileService.moveFile(oldPath, newPath);
      body.FOTO = foto
    } 
    if (files.fotoktp !== undefined) {
      fotoktp = `${fields.GUID}--${dateNow}-.${fileService.getFileExtension(files.fotoktp.name)}`;
      const oldPath = files.fotoktp.path;
      const newPath = `${process.env.IMAGE_PATH}/${fotoktp}`;
      await fileService.moveFile(oldPath, newPath);
      body.FOTO_KTP = fotoktp
    } 
   
    body.INSTANSI = req.instansi
    const user = await service.updateOne({GUID : req.params.guid},body);
    response = { ...requestResponse.success, user };
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

const getQuery = query => {
  // console.log(query)
  let newQuery = {}
  if (query.USERNAME !== "" && query.USERNAME !== undefined && query.USERNAME !== "null") {
    Object.assign(newQuery, {
      USERNAME : query.USERNAME
    })
  }
  return newQuery
}

module.exports = {
  create,
  get,
  getById,
  updateOne,
  deleteOne
};
