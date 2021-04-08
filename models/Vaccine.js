const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vaccine extends Model {}

Vaccine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_dose: {
      type: DataTypes.STRING,
      allowNull: false
    },
    second_dose: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vaccine_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vaccine',
  }
);

module.exports = Vaccine;