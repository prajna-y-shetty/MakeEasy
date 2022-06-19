const express = require('express');
const router = express.Router();
const serviceproviderController = require('../controllers/serviceproviderController')

router.post("/registersp",serviceproviderController.registersp);
router.post("/loginsp",serviceproviderController.loginsp);
router.post("/profilesp",serviceproviderController.profilesp);
router.get('/verifyEmail/:user_id',serviceproviderController.verifyEmail)

module.exports = router;