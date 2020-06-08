module.exports = (sequelize, DataTypes) => {
    const schema = {
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validation: {
                notNull: {
                    args: [true],
                    msg: 'We need a genre'
                },
                notEmpty: {
                    args: [true],
                    msg: 'We need a genre'
                },
            },
        },
    };
    return sequelize.define('Genre', schema);
}
