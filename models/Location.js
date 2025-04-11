const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    lat: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING
    },
    hours: {
      type: DataTypes.STRING
    },
    capacity: {
      type: DataTypes.STRING
    },
    fee: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    last_seen: {
      type: DataTypes.DATE
    },
    found_time: {
      type: DataTypes.DATE
    },
    additional_info: {
      type: DataTypes.JSON
    }
  }, {
    tableName: 'Locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  // Associate with Category
  Location.associate = (models) => {
    Location.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
  };

  return Location;
};