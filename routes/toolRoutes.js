const express = require('express');
const router = express.Router();
const {
  getAllTools,
  createTool,
  updateTool,
  deleteTool
} = require('../controllers/toolController');
const { validateTool } = require('../middleware/validateTool');

router.get('/', getAllTools);
router.post('/', validateTool, createTool); // keep single validated POST
router.put('/:id', validateTool, updateTool);
router.delete('/:id', deleteTool);

module.exports = router;
