const express = require('express');
const router = express.Router();
const {
  getAllDevelopers,
  createDeveloper,
    updateDeveloper,
    deleteDeveloper
} = require('../controllers/developerController');
const { validateDeveloper } = require('../middleware/validateDeveloper');

router.get('/', getAllDevelopers);
router.post('/', validateDeveloper, createDeveloper);
router.put('/:id', validateDeveloper, updateDeveloper);
router.delete('/:id', deleteDeveloper);


module.exports = router;