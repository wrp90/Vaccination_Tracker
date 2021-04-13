const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vaccine extends Model {}
//Add extra validations
Vaccine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_dose: {
      type: DataTypes.BOOLEAN,
    },
    second_dose: {
      type: DataTypes.BOOLEAN,
    },
    vaccine_name: {
      type: DataTypes.STRING,
    },
    location_name: {
      type: DataTypes.STRING,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patient',
        key: 'id',
      },
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