const { validationResult } = require('express-validator');

const validate = (chains) => async (req, res, next) => {
  await Promise.all(chains.map((c) => c.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      details: errors.array().map(e => ({ field: e.path, msg: e.msg }))
    });
  }
  next();
};

module.exports = { validate };
