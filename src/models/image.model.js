module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    name: {
      type: DataTypes.STRING,
    },
    nameimage: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    infer_ai: {
      type: DataTypes.STRING,
    },
    infer_doctor: {
      type: DataTypes.STRING,
    },
  });

  return Image;
};
