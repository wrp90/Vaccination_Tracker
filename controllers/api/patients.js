const router = require('express').Router();
const { Patient, Vaccine } = require('../../models');
const sequelize = require('../../config/connection');

router.post('/', async (req, res) => {
  try {
    const userData = await Patient.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/chart', async (req, res) => {
  try {
    const totalDose = await Vaccine.findAll({
      include: [
        {
          model: Patient
        },
      ],
      attributes: {
        include: [
          [sequelize.literal('(SELECT COUNT(first_dose) FROM vaccine WHERE first_dose)'), 'firstDose'],
          [sequelize.literal('(SELECT COUNT(second_dose) FROM vaccine WHERE second_dose)'), 'secondDose'],
          [sequelize.literal('(SELECT COUNT(*) FROM patient)'), 'totalPatients']
        ],
        exclude: [
          'id',
          'first_dose',
          'location_name',
          'patient_id',
          'patient_number',
          'second_dose',
          'vaccine_name'
        ],
      }
    });
    const doseTotals = totalDose.map((totalDoses) => totalDoses.get({ plain: true }));
    console.log(doseTotals)
    res.send(doseTotals);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await Patient.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/form', async (req, res) => {
  try {
    const user = await Vaccine.create({
      ...req.body,
      patient_id: req.session.user_id
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;