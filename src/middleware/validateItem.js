// middleware/validateItem.js
const { body, validationResult } = require('express-validator');

exports.validateAddItem = [
  body('Item_name').notEmpty().withMessage('Item name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('status').isIn(['Lost', 'Found']).withMessage('Status must be Lost or Found'),
  body('location.city').notEmpty().withMessage('City is required in location'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  }
];
