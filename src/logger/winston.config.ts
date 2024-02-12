/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
const winston = require("winston");
const SlackHook = require("winston-slack-webhook-transport");

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            // Add a timestamp to the console logs
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
                return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ""}`;
            })
        ),
    }),

    new SlackHook({
        webhookUrl: process.env.SLACK_WEBHOOK,
        channel: "#e-commerce-api",
        username: "LoggerBot",
        // level: "info",

        format: winston.format.combine(
            winston.format.timestamp(), // Add a timestamp to Slack logs
            winston.format.printf(({ timestamp, level, message, context, trace }) => {
                return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ""}`;
            })
        ),
    }),
];

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports,
});
