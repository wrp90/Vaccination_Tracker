const router = require('express').Router();
const { Vaccine, Patient } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    // const vaccineData = await Vaccine.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['user_name'],
    //     },
    //   ],
    // });
    // Serialize data so the template can read it
    // const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage');
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


router.get('/vcard', withAuth, async (req, res) => {
  try {
    const userData = await Patient.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Vaccine}],
    });
    const patient = userData.get({ plain: true });
    console.log(patient);
    res.render('vaccinecard', {
      patient,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    }
});

router.get('/form', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('form');
});

router.post('/form', async (req, res) => {
  try {
    const user = await Patient.findOne({ name: 'Shawn' });
    const userData = await Vaccine.create({ ...req.body, id: user.id });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;