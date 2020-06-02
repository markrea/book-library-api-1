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
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            notNull: {
                args: [true],
                msg: 'We need an author',
            },
            notEmpty: {
                args: [true],
                     msg: 'Author must not be empty'
            },
        },
        },
        genre: DataTypes.STRING,
        isbn: DataTypes.STRING,
    };

    return sequelize.define('Book', schema);
};