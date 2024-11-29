const Role = require('../models/roleModel');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    // Check if the role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists!' });
    }

    // Create a new role
    const newRole = await Role.create({ name, permissions });
    res.status(201).json({ message: 'Role created successfully!', role: newRole });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error: error.message });
  }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json({ message: 'Roles retrieved successfully', roles });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving roles', error: error.message });
  }
};

// Update a role (optional)
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { permissions },
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json({ message: 'Role updated successfully', role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error: error.message });
  }
};

// Delete a role (optional)
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully', role: deletedRole });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error: error.message });
  }
};
