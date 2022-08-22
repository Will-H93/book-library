module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
    genre: DataTypes.STRING,
    isbn: DataTypes.STRING,
  };

  const BookModel = connection.define("book", schema);
  return BookModel;
};
