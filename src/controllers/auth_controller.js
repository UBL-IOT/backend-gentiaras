const authService = require("../services/auth_service");
const {
  requestResponse
} = require("../utils");
const logger = require("../utils/logger");

let response;

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginResponse = await authService.login({ username, password });
    
    response = { ...loginResponse };
  } catch (error) {
    logger.error(error);
    response = { ...requestResponse.server_error };
  }

  res.json(response);
};


module.exports = {
  login
};
