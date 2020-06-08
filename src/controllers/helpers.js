const { Book, Reader} = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
    };
    return models[model];
};

const getAllItems = (res, model) => {
    const Model = getModel(model);

  return Model.findAll().then((allItems) => {
      res.status(200).json(allItems);
  });
};
const createItem = (res, model, item) => {
    const Model = getModel(model);

    return Model
    .create(item)
    .then(newItemCreated => {
        res.status(201).json(newItemCreated)})
        .catch((error) => {
            const errorMessages = error.errors.map((e) => e.message);

            return res.status(400).json({ errors: errorMessages});
        });
};

const updateItem = (res, model, item, id) => {
   const Model = getModel(model);

    return Model
    .update(item, { where: { id } })
    .then(([recordsUpdated]) => {
        if(!recordsUpdated) {
            res.status(404).json(get404Error(model));
        } else {
            getModel(model).findByPk(id).then((updatedItem) => {
                res.status(200).json(updatedItem)
            });
        };
    });
};
module.exports = {
    createItem,
    getAllItems,
    updateItem,
}