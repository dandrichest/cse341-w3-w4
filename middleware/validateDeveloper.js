const { body, validationResult } = require('express-validator');

const validateDeveloper = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('bio').optional().isString(),
  body('location').optional().isString(),
  body('github').optional().isURL(),
  body('website').optional().isURL(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateDeveloper;
