const router = require('express').Router();
const { Vaccine, Patient } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const patientData = await Patient.findAll({
      include: [
        {
          model: Vaccine
        },
      ],
    });

    const patients = patientData.map((patient) => patient.get({ plain: true }));

    res.render('homepage', {
      patients,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/database', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const patientData = await Patient.findAll({
      include: [
        {
          model: Vaccine
        },
      ],
    });

    // Serialize data so the template can read it
    const patients = patientData.map((patient) => patient.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('database', {
      patients,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await Patient.findByPk(req.session.user_id, {
      include: [{ model: Vaccine}],
      attributes: { exclude: ['password'] },
    });
    const patient = userData.get({ plain: true });
    res.render('dashboard', {
      patient,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/form', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('form');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/logout', (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('homepage');
});

module.exports = router;