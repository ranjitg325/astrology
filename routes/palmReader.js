const express = require('express');
const router = express.Router();
const palmReaderController = require('../controllers/palmReaderController');
const middleware = require("../middleware/authenticateUser");

router.post('/palmReaderCreate', /*middleware.authenticateToken,*/palmReaderController.palmReaderCreate);
router.get('/getAllPalmReaders', /*middleware.authenticateToken,*/palmReaderController.getAllPalmReaders);
router.get('/getAllPalmReadOfOwn', middleware.authenticateToken, palmReaderController.getAllPalmReadOfOwn);
//router.get('/getPalmReaderById',/* middleware.authenticateToken,*/palmReaderController.getPalmReaderById);
router.put('/updatePalmReader/:id',/* middleware.authenticateToken,*/palmReaderController.updatePalmReaderById);
router.delete('/deletePalmReader/:id',/*middleware.authenticateToken,*/ palmReaderController.deletePalmReaderById);

module.exports = router;


