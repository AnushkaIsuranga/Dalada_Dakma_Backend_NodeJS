const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Categories',
    timestamps: false
  });

  Category.associate = (models) => {
    Category.hasMany(models.Notice, {
      foreignKey: 'categoryId',
      as: 'notices'
    });
  };

  return Category;
};