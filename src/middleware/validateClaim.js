const { body, validationResult } = require('express-validator');

exports.validateClaim = [
  body('item_id').notEmpty().withMessage('Item ID is required'),
  body('claimant_id').notEmpty().withMessage('Claimant ID is required'),
  body('message.item_name').notEmpty().withMessage('Item name is required'),
  body('message.item_color').notEmpty().withMessage('Item color is required'),

  // Final handler to check errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
