import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${label} (${timestamp}) [${level}] : ${message}`;
});

const devLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      label({ label: "DEV:" }),
      timestamp({ format: "MM-DD HH:mm:ss" }),
      colorize(),
      myFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "/src/logs/devLogger.log" }),
    ],
  });
};

export default devLogger;
