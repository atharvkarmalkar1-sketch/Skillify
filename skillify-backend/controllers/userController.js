const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// In-memory user storage (shared with authController)
const users = [];

exports.getAllUsers = async (req, res, next) => {
  try {
    // Return users without passwords
    const safeUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }));
    res.json(safeUsers);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Return user without password
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    res.json(safeUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Only allow updating certain fields
    const allowedUpdates = ['username', 'email'];
    const filteredUpdate = {};
    allowedUpdates.forEach(field => {
      if (update[field]) {
        filteredUpdate[field] = update[field];
      }
    });
    
    users[userIndex] = { ...users[userIndex], ...filteredUpdate };
    
    // Return updated user without password
    const safeUser = {
      id: users[userIndex].id,
      username: users[userIndex].username,
      email: users[userIndex].email,
      role: users[userIndex].role
    };
    res.json(safeUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Valid role required' });
    }
    
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.role = role;
    
    // Return updated user without password
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    res.json(safeUser);
  } catch (err) {
    next(err);
  }
}; 