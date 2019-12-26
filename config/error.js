const httpStatus = require('http-status');

exports.notFound = (req, res, next) => {
  const err = {
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  };

  return res.status(err.status).send(err);
};
