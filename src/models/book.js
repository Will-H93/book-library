module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    genre: DataTypes.STRING,
    isbn: DataTypes.STRING,
  };

  const BookModel = connection.define("book", schema);
  return BookModel;
};
