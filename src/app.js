require("dotenv").config();
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const format = require("date-fns/format");
const mongo = require("./db_config/mongo");
const helmet = require("helmet");
const routes = require("./routes");
const bearerToken = require("./middlewares/bearer_token");
const parseAppType = require("./middlewares/app_type");
const { cors } = require("./config");
const logger = require("./utils/logger");
const { requestResponse } = require("./utils/index");

morgan.token("date", (req, res, tz) => {
  return `[${format(new Date(), "dd-MM-yyyy HH:mm:ss")}]`;
});

mongo.createConnection().then((_) => logger.info("MongoDB connected!"));

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors);
app.use(bearerToken());
app.use(parseAppType());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(
    ":date[Asia/Jakarta] :method :url :status :response-time ms - :res[content-length]"
  )
);
app.use(routes);
app.use(express.static("src/static"));
// app.use('/static', express.static('static'))
app.use((req, res) => {
  const response = requestResponse.not_found;
  res.json(response);
});

module.exports = app;
