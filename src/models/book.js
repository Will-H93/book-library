module.exports = (connection, DataTypes) => {
  const schema = {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    isbn: DataTypes.STRING,
  };

  const BookModel = connection.define("book", schema);
  return BookModel;
};
