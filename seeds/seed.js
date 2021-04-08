const sequelize = require('../config/connection');
const { Patient, Vaccine } = require('../models');

const patientData = require('./patientData.json');
const vaccineData = require('./vaccineData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const patients = await Patient.bulkCreate(patientData, {
    individualHooks: true,
    returning: true,
  });

  for (const vaccine of vaccineData) {
    await Vaccine.create({
      ...vaccine,
      patient_id: patients[Math.floor(Math.random() * patients.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
