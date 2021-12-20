module.exports = (sequelize, DataTypes) => {
  const userImage = sequelize.define("userimage", {
    phone: {
      type: DataTypes.STRING,
    },
    nameimage: {
      type: DataTypes.STRING,
    },
    infer_ai: {
      type: DataTypes.STRING,
    }
  });

  return userImage;
};
