const router = require('express').Router();
const patientRoutes = require('./patients');
// const vaccineRoutes = require('./vaccineRoutes');

router.use('/patients', patientRoutes);
// router.use('/vaccines', vaccineRoutes);

module.exports = router;