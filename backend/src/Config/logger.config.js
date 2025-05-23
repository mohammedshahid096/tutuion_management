const { createLogger, format, transports } = require("winston");
const { DEVELOPMENT_MODE } = require("./index.config");
const { combine, timestamp, json, splat } = format;

const DevelopmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), json(), splat()),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "app-combined.log" }),
      new transports.File({ filename: "app-error.log", level: "error" }),
      new transports.File({ filename: "app-info.log", level: "info" }),
      new transports.File({ filename: "app-debug.log", level: "debug" }),
    ],
  });
};
const ProductionLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), json(), splat()),
    transports: [
      new transports.Console({ level: "error" }),
      //   new transports.File({ filename: "app-combined.log" }),
      // new transports.File({ filename: "app-error.log", level: "error" }),
      //   new transports.File({ filename: "app-info.log", level: "info" }),
    ],
  });
};

const logger =
  DEVELOPMENT_MODE === "development" ? DevelopmentLogger() : ProductionLogger();

module.exports = logger;
