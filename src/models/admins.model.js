module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define("admins", {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    }
  });

  return Admins;
};
