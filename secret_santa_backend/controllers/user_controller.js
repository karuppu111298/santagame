// controllers/userController.js
const userService = require('../services/user_service');
const Employee = require('../models/employee_model');
const fs = require('fs');
const { Parser } = require('json2csv');




const fileUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const employee = await userService.fileUpload(filePath);
    await userService.insertEmployees(employee);
    const assignments = await userService.generateSecretSanta();
    res.status(201).json({ assignments,message:'Data Upload Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const employeeAssignList = async (req, res) => {
  try {
    const employee = await userService.employeeAssignList();
    res.status(200).json({ employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const employeeAssignExport = async (req, res) => {
  try {
    const employee_export = await userService.employeeAssignExport();
    if (!employee_export) {
      return res.status(404).json({ status:false,error: 'No data found to export' });
    }
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(employee_export); // Send CSV as the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { fileUpload, employeeAssignList, employeeAssignExport};
