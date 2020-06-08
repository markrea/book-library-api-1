module.exports = (sequelize, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'Please give an author name',
                },
                notEmpty: {
                    args: [true],
                    msg: 'The author must have a name',
                },
            },
        },
    };
    return sequelize.define('Author', schema);
};
