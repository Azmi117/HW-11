const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/Todo.controller');

router.post('/todo/create', TodoController.insertData);
router.delete('/todo/delete/:id', TodoController.deleteData);
router.get('/todo/:id', TodoController.getDataById);
router.get('/todo', TodoController.getData);


module.exports = router;