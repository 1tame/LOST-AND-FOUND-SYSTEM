// validateUser.js
const { body, validationResult } = require('express-validator');

exports.validateAddUser = [
  body('user_name').notEmpty().withMessage('User name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 5 }).withMessage('Password too short'),
  body('Phone').isNumeric().withMessage('Phone must be a number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  }
];

exports.validateLogin = [
  body('user_name').notEmpty().withMessage('User name is required'),
  body('password').notEmpty().withMessage('Password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  }
];
