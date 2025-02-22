// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const userController = require('../controllers/user_controller');
const authenticate = require('../middleware/auth_middleware')

// Define routes

router.post('/file_upload',upload.single('csvFile'), userController.fileUpload);
router.post('/employee_assign_list', userController.employeeAssignList);
router.get('/employee_assign_export', userController.employeeAssignExport);

module.exports = router;
