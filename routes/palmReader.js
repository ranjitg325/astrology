const express = require('express');
const router = express.Router();
const palmReaderController = require('../controllers/palmReaderController');
const middleware = require("../middleware/authenticateUser");

router.post('/palmReaderCreate', /*middleware.authenticateToken,*/palmReaderController.palmReaderCreate);
router.get('/getAllPalmReaders', /*middleware.authenticateToken,*/palmReaderController.getAllPalmReaders);
router.get('/getPalmReaderById',/* middleware.authenticateToken,*/palmReaderController.getPalmReaderById);
router.put('/updatePalmReader',/* middleware.authenticateToken,*/palmReaderController.updatePalmReaderById);
router.delete('/deletePalmReader',/*middleware.authenticateToken,*/ palmReaderController.deletePalmReaderById);

module.exports = router;


