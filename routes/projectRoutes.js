const express = require('express');
const router = express.Router();
const { validateProject } = require('../middleware/validateProject');

const {
  getAllProjects,
  createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

router.get('/', getAllProjects);
router.post('/', validateProject, createProject);
router.put('/:id', validateProject, updateProject);
router.delete('/:id', deleteProject);


module.exports = router;
