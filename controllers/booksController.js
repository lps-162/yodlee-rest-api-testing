var booksModel = require('../models/booksModel');

var list = (req, res) => {
    var query = booksModel.find({});
    query.exec((err, books) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).json(books);
    });
}

var create = (req, res) => {
    // create a new book
    var newBook = new booksModel(req.body);

    newBook.save((err, book) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).json({message: 'Book successfully created', book});
    });
}

var read = (req, res) => {
    booksModel.findById(req.params.id, (err, book) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).json(book);
    });
}

var update = (req, res) => {
    booksModel.findById({_id: req.params.id}, (err, book) => {
        if (err)
            res.status(500).send(err);
        Object.assign(book, req.body).save((err, book) => {
            if (err)
                res.status(500).send(err);
            else
                res.status(202).json({message: 'Book successfully updated', book});
        });
    });
}

var del = (req, res) => {
    booksModel.remove({_id: req.params.id}, (err) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(204).end();
    });
}

module.exports = {
    list: list,
    create: create,

    read: read,
    update: update,
    del: del

}