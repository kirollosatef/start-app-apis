import devLogger from "./loggers/development.logger";

let logger = null;

if (process.env.NODE_ENV === "development") {
  logger = devLogger();
}

export default logger;
