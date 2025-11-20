const express = require('express');
const router = express.Router();

const ensureAuth = require('../middleware/ensureAuth');
const validateTool = require('../middleware/validateTool');

const {
  getAllTools,
  getTool,
  createTool,
  updateTool,
  deleteTool
} = require('../controllers/toolController');

router.get('/', getAllTools);
router.get('/:id', getTool);
router.post('/', ensureAuth, ...validateTool, createTool);
router.put('/:id', ensureAuth, ...validateTool, updateTool);
router.delete('/:id', ensureAuth, deleteTool);

module.exports = router;
