const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const AdminUser = sequelize.define('AdminUser', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [4, 20] // Enforce username length
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 100] // Enforce minimum password length
      },
      set(value) {
        // Hash password before saving
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      }
    }
    }, {
        tableName: 'AdminUsers',
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['password'] } // Normally exclude password
        },
        scopes: {
            withPassword: {
                attributes: {} // Include password when needed
            }
        }
    });

    // Instance method to compare passwords
    AdminUser.prototype.comparePassword = async function(candidatePassword) {
        return bcrypt.compare(candidatePassword, this.password);
    };

    return AdminUser;
};