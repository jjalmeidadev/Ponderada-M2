const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/login', userController.showLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/dashboard', userController.dashboard);

module.exports = router;
