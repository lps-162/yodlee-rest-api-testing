var express = require('express');
var booksController = require('../controllers/booksController');

var booksRouter = express.Router();

booksRouter.route('/')
	.get(booksController.list)
	.post(booksController.create);

booksRouter.route('/:id')
	.get(booksController.read)
	.put(booksController.update)
	.delete(booksController.del);

module.exports = booksRouter;