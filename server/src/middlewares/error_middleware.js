const errormiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errormiddleware;
