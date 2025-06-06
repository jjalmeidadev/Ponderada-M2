// controllers/userController.js

const userService = require('../services/userService');
const eventService = require('../services/eventService'); // Add this line

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await userService.updateUser(req.params.id, name, email);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showLogin = (req, res) => {
  res.render('pages/login', { error: null });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticate(email, password);
  if (user) {
    const fullUser = await userService.getUserById(user.id || user.user_id);
    if (fullUser) {
      req.session.userId = fullUser.id || fullUser.user_id;
      return req.session.save(() => {
        res.redirect('/dashboard');
      });
    }
  }
  res.render('pages/login', { error: 'Informações inválidas' });
};

const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};

const dashboard = async (req, res) => {
  let events = [];
  try {
    events = await eventService.getAllEvents();
  } catch (err) {
    events = [];
  }
  res.render('pages/dashboard', { events: events || [], user: req.user });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  showLogin,
  login,
  logout,
  dashboard
};
