const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Subscriber = sequelize.define('Subscriber', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    subscriptionDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'Subscribers',
    timestamps: false
  });

  return Subscriber;
};