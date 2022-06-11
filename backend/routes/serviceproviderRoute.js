const express = require('express');
const router = express.Router();
const serviceproviderController = require('../controllers/serviceproviderController')

router.post("/registersp",serviceproviderController.registersp);
router.post("/loginsp",serviceproviderController.loginsp);

module.exports = router;