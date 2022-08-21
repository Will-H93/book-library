module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        is: (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/)
      }
    }
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
