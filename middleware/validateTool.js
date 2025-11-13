const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.validateTool = [
  body('name').notEmpty().withMessage('Tool name is required'),
  body('category').optional().isString().withMessage('Category must be a string'),
  body('project')
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Project ID must be valid'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
