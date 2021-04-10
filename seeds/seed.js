const sequelize = require('../config/connection');
const { Patient, Vaccine } = require('../models');

const patientData = require('./patientData.json');
const vaccineData = require('./vaccineData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Patient.bulkCreate(patientData, {
    individualHooks: true,
    returning: true,
  });

  await Vaccine.bulkCreate(vaccineData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
