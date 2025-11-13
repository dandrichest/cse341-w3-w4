const Tool = require('../models/Tool');

exports.getAllTools = async (req, res) => {
  const tools = await Tool.find().populate('project');
  res.json(tools);
};

exports.createTool = async (req, res) => {
  try {
    const newTool = new Tool(req.body);
    await newTool.save();
    res.status(201).json(newTool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTool = async (req, res) => {
  try {
    const updated = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Tool not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const deleted = await Tool.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Tool not found' });
    res.json({ message: 'Tool deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
