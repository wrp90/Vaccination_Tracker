const sequelize = require('../config/connection');
const { Patient, Vaccine } = require('../models');

const patientData = require('./patientData.json');
const vaccineData = require('./vaccineData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Patient.bulkCreate(patientData, {
    individualHooks: true,
    returning: true,
  });

  for (const vaccine of vaccineData) {
    await Vaccine.create({
      ...vaccine,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
