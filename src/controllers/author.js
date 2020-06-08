const {
    getAllItems,
    createItem,
    updateItem,
    getItemById,
    deleteItem,
} = require('./helpers');

const createAuthor = (req, res) => createItem(res, 'author', req.body);

module.exports = {
    createAuthor,
}