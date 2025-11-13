const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.validateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('techStack').isArray().withMessage('Tech stack must be an array'),
  body('developer')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Developer ID must be valid'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
