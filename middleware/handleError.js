import { STATUS_CODES } from 'http'

export const handleError = (err, req, res, next) => {
  if (res.headerSent) return next(err);

  if (!err.statusCode) console.error(err);
  const statusCode = err.statusCode || 500;
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'
  return res.status(statusCode).json({ error: errorMessage });
};
