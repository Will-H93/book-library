module.exports = (connection, DataTypes) => {
  const schema = {
    title: DataTypes.STRING,
    isbn: DataTypes.STRING,
  };

  const bookModel = connection.define("Book", schema);
  return bookModel;
};
