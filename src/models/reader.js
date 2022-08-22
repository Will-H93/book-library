module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: [1, ],
          msg: 'Must be at least 1 character'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        is: /.{8,}/g
      }
    }
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
