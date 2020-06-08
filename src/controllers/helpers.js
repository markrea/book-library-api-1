const { Book, Reader, Author, Genre} = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
        author: Author,
        genre: Genre,
    };
    return models[model];
};

const removePassword =(obj) => {
    if(obj.hasOwnProperty('password')) {
        delete obj.password;
    }
    return obj;
};

const getOptions = (model) => {
    if (model === 'book') return { include: [{ model: Genre }, { model: Author }] };
    if (model === 'genre') return { include: Book };
    if (model === 'author') return { include: Book};
  
    return {};
  };
  

  const getAllItems = (res, model) => {
    const Model = getModel(model);
    const options = getOptions(model);
  
    Model.findAll({ ...options }).then((items) => {
      const itemsWithoutPassword = items.map((item) =>
        removePassword(item.dataValues)
      );
      res.status(200).json(itemsWithoutPassword);
    });
  };
  
const createItem = (res, model, item) => {
    const Model = getModel(model);

    return Model
    .create(item)
    .then((newItemCreated) => {
        const itemWithoutPassword = removePassword(newItemCreated.dataValues);
        res.status(201).json(itemWithoutPassword);
    })
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
                const itemWithoutPassword = removePassword(updatedItem.dataValues)
                res.status(200).json(itemWithoutPassword)
            });
        };
    });
};

const getItemById = (res, model, id) => {
    const Model = getModel(model);
    const options = getOptions(model);
  
    Model.findByPk(id, { ...options }).then((item) => {
      if (!item) {
        res.status(404).json(get404Error(model));
      } else {
        const itemWithoutPassword = removePassword(item.dataValues);
        res.status(200).json(itemWithoutPassword);
      }
    });
  };
const deleteItem = (res, model, id) => {
    const Model = getModel(model);

    return Model
    .findByPk(id)
    .then(foundItem => {
        if(!foundItem) {
            res.status(404).json(get404Error(model));
        } else {
            Model
            .destroy({ where: { id } })
            .then(() => {
                res.status(204).send();
            });
        };
    });
};
module.exports = {
    createItem,
    getAllItems,
    updateItem,
    getItemById,
    deleteItem,
}