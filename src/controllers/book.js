const { Book } = require('../models');

const getBooks = (_, res) => {
    Book.findAll().then(books => {
        res.status(200).json(books);
    });
}
module.exports = {
    getBooks,
};
