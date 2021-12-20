module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    phone: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    cmnd: {
      type: DataTypes.STRING,
    },
  });

  return users;
};
