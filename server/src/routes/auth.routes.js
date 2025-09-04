const router = require('express').Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { register, login } = require('../controllers/auth.controller');

router.post(
  '/register',
  validate([
    body('username').isString().isLength({ min: 3, max: 20 }).withMessage('username 3–20 chars'),
    body('email').isEmail().withMessage('valid email required'),
    body('password').isString().isLength({ min: 8 }).withMessage('password min 8 chars')
  ]),
  register
);

router.post(
  '/login',
  validate([
    body('identifier').isString().notEmpty().withMessage('email or username required'),
    body('password').isString().notEmpty().withMessage('password required')
  ]),
  login
);

module.exports = router;
