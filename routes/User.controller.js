const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User.controller');

router.post('/user/create', UserController.insertData);
router.delete('/user/delete/:id', UserController.deleteData);
router.get('/user/:id', UserController.getDataById);
router.get('/user', UserController.getData);


module.exports = router;