const express = require('express');
const router = express.Router();

const ensureAuth = require('../middleware/ensureAuth');
const validateProject = require('../middleware/validateProject');

const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', ensureAuth, ...validateProject, createProject);
router.put('/:id', ensureAuth, ...validateProject, updateProject);
router.delete('/:id', ensureAuth, deleteProject);

module.exports = router;
