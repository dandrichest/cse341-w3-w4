const Developer = require('../models/Developer');

exports.getAllDevelopers = async (req, res, next) => {
  try {
    const developers = await Developer.find();
    res.json(developers);
  } catch (err) {
    next(err);
  }
};

exports.getDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id);
    if (!developer) return res.status(404).json({ error: 'Developer not found' });
    res.json(developer);
  } catch (err) {
    next(err);
  }
};

exports.createDeveloper = async (req, res, next) => {
  try {
    const newDeveloper = new Developer(req.body);
    await newDeveloper.save();
    res.status(201).json(newDeveloper);
  } catch (err) {
    next(err);
  }
};

exports.updateDeveloper = async (req, res, next) => {
  try {
    const updated = await Developer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Developer not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteDeveloper = async (req, res, next) => {
  try {
    const deleted = await Developer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Developer not found' });
    res.json({ message: 'Developer deleted' });
  } catch (err) {
    next(err);
  }
};
