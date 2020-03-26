import { STATUS_CODES } from 'http'

export const handleError = (err, req, res, next) => {
  if (res.headerSent) return next(err);



  if (!err.status || !err.statusCode) console.error(err);
  const statusCode = err.status || 500;
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'
  const errorDetail = err.message || null
  return res.status(statusCode).json({
    error: errorMessage,
    errorDetail
  });
};
