const { createLogger, transports } = require("winston");

const logger = createLogger({
  level: "debuge",
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log", level: "info" }),
    // new transports.Console({ level: "info" }),
  ],
});
module.exports = logger;
