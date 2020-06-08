const { Book } = require('../models');

const {
    getAllItems,
    createItem,
    updateItem,
} = require('./helpers');


const getBooks = (_, res) => getAllItems(res, 'book'); 

const createBook = (req, res) => createItem(res, 'book', req.body); 

const getBookById = (req, res) => {
    const { id } = req.params;

    Book.findByPk(id).then(book => {
        if(!book) {
            res.status(404).json({ error: 'The book could not be found.' });
        } else {
            res.status(200).json(book);
        };
    });
};

const updateBook = (req, res) => updateItem(res, 'book', req.body, req.params.id)

const deleteBook = (req, res) => {
    const { id } = req.params;

    Book
    .findByPk(id)
    .then(foundBook => {
        if(!foundBook) {
            res.status(404).json({ error: 'The book could not be found.'});
        } else {
            Book.destroy({ where: { id } })
            .then(() => {
                res.status(204).send();
            });
        }
    });
}
module.exports = {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
};
