const express = require('express');
const router = express.Router();

const ensureAuth = require('../middleware/ensureAuth');
const validateDeveloper = require('../middleware/validateDeveloper');

const {
  getAllDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper
} = require('../controllers/developerController');

router.get('/', getAllDevelopers);
router.get('/:id', getDeveloper);
router.post('/', ensureAuth, ...validateDeveloper, createDeveloper);
router.put('/:id', ensureAuth, ...validateDeveloper, updateDeveloper);
router.delete('/:id', ensureAuth, deleteDeveloper);

module.exports = router;