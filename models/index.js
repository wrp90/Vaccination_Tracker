const Patient = require('./Patient');
const Vaccine = require('./Vaccine');

Patient.hasOne(Vaccine, {
  foreignKey: 'patient_id',
  onDelete: 'CASCADE'
});

Vaccine.belongsTo(Patient, {
  foreignKey: 'patient_id'
});

module.exports = { Patient, Vaccine };
