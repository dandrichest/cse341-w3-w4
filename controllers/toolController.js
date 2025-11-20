const Tool = require('../models/Tool');

exports.getAllTools = async (req, res, next) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err) {
    next(err);
  }
};

exports.getTool = async (req, res, next) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ error: 'Tool not found' });
    res.json(tool);
  } catch (err) {
    next(err);
  }
};

exports.createTool = async (req, res, next) => {
  try {
    const newTool = new Tool(req.body);
    await newTool.save();
    res.status(201).json(newTool);
  } catch (err) {
    next(err);
  }
};

exports.updateTool = async (req, res, next) => {
  try {
    const updated = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Tool not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteTool = async (req, res, next) => {
  try {
    const deleted = await Tool.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Tool not found' });
    res.json({ message: 'Tool deleted' });
  } catch (err) {
    next(err);
  }
};
