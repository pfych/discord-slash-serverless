/* eslint-disable no-shadow */
import {
  createLogger,
  format,
  Logger,
  transports,
} from 'winston';

const {
  combine,
  timestamp,
  printf,
  label,
} = format;

const myFormat = printf(({
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

export const newLogger = (service = 'Service'): Logger => createLogger({
  level: 'info',
  format: combine(
    label({ label: service }),
    timestamp(),
    myFormat,
  ),
  defaultMeta: { service },
  transports: [
    new transports.Console(),
  ],
});
