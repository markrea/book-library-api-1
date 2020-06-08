module.exports = (sequelize, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: {
                args: [true],
                msg: 'We need a book title',
            },
            notEmpty: {
                args: [true],
                 msg: 'Title cannot be empty'
            },
        },
    },
    
        isbn:{
            type: DataTypes.STRING,
        },
    };

    return sequelize.define('Book', schema);
};