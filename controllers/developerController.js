const Developer = require('../models/Developer');

exports.getAllDevelopers = async (req, res) => {
  const devs = await Developer.find();
  res.json(devs);
};

exports.createDeveloper = async (req, res) => {
  try {
    const newDev = new Developer(req.body);
    await newDev.save();
    res.status(201).json(newDev);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDeveloper = async (req, res) => {
  try {
    const updated = await Developer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Developer not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDeveloper = async (req, res) => {
  try {
    const deleted = await Developer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Developer not found' });
    res.json({ message: 'Developer deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
