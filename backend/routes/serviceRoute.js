const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController')

router.post('/addservice', serviceController.addservice)
router.get('/getservices',serviceController.getservices)
router.get('/listservice',serviceController.listservice)
router.get('/oneservice/:id', serviceController.oneservice)
router.post('/editservice', serviceController.editService)
router.delete('/deleteservice', serviceController.deleteservice)
module.exports = router;