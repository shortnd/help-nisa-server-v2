export const handleValidationError = (err, req, res, next) => {
  if (err.name !== 'ValidationError') return next(err);

  return res.status(400).json({ error: err._message, errorDetail: err.errors });
};
