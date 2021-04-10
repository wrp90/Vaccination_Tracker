const router = require('express').Router();
// const { Vaccine, Patient } = require('../models');
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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
  