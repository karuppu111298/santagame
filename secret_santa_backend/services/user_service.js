// services/userService.js
const User = require('../models/user_model');
const Employee = require('../models/employee_model');
const SecretSanta = require('../models/employee_assign_model');

const multer = require('multer');
const csvParser = require('csv-parser');
const { parse } = require('json2csv');
const fs = require('fs');

const fileUpload = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(csvParser({ headers: false }))
      .on('data', (data) => {
        const formattedData = {
          name: data[0],  
          email: data[1],
        };
        results.push(formattedData);
      })
      .on('end', () => {
        resolve(results); 
      })
      .on('error', (err) => {
        reject(new Error(`Error reading CSV file: ${err.message}`));  // Reject the promise if there's an error
      });
  });
};

const insertEmployees = async (employees) => {
  const result = [];

  for (let employee of employees) {
    try {
      const existingEmployee = await Employee.findOne({ email: employee.email });
      if (existingEmployee) {
        result.push({ error: `Email ${employee.email} already exists` });
      } else {
        const newEmployee = new Employee(employee);
        await newEmployee.save();
        result.push({ success: `Employee ${employee.name} added successfully` });
      }
    } catch (error) {
      result.push({ error: `Error inserting employee: ${error.message}` });
    }
  }

  return result;
};
const generateSecretSanta = async () => {
  const get_all_employee = await Employee.find();
  const emp_id = get_all_employee.map(entry => entry.id);
  let assignments = {};
  let remainingNames = [...emp_id]; // Copy of all employee ids
  for (const id of emp_id) {
    const previousReceiver = await SecretSanta.find({ giver: id }).select('receiver').exec();
    let receiverArray = previousReceiver.map(item => item.receiver.toString());
    receiverArray.push(id.toString());
    const possibleReceivers = remainingNames.filter(name => !receiverArray.includes(name.toString()));
    console.log('id',id,'receiverArray',receiverArray,'possibleReceivers',possibleReceivers);
    if (possibleReceivers.length === 0) {
      return { error: `No valid recipient available for ${id}!` };
    }
    const receiver = possibleReceivers[Math.floor(Math.random() * possibleReceivers.length)];
    assignments[id] = receiver;
  }
  for (const [giver, receiver] of Object.entries(assignments)) {
    const previousReceiverExists = await SecretSanta.exists({ giver, receiver });
    if (!previousReceiverExists) {
      await SecretSanta.create({ giver, receiver });
    }
  }
  return assignments;
};


const employeeAssignList = async () => {
  try {

    const employee_assign = await SecretSanta.find()
    .populate('giver') // Populate giver with employee data
    .populate('receiver') // Populate receiver with employee data
    .exec();

    return employee_assign;
  } catch (err) {
    throw new Error('Error fetching users: ' + err.message);
  }
};

const employeeAssignExport = async (req, res) => {
  try {

    const employee_assign = await SecretSanta.find()
    .populate('giver') // Populate giver with employee data
    .populate('receiver') // Populate receiver with employee data
    .exec();

    if (employee_assign.length === 0) {
      return null;
    }

    const csvData = employee_assign.map((assignment) => ({
      giverName: assignment.giver.name,
      giverEmail: assignment.giver.email,
      receiverName: assignment.receiver.name,
      receiverEmail: assignment.receiver.email,
    }));
    const csvOptions = {
      fields: ['giverName', 'giverEmail', 'receiverName', 'receiverEmail'], // Specify the fields
    };

    const csv = parse(csvData, csvOptions);

    return csv;
  } catch (err) {
    console.error('Error fetching data or generating CSV:', err);
    if (!res.headersSent) {
      return res.status(500).send('Error fetching data or generating CSV: ' + err.message);
    }
  }
};

module.exports = { fileUpload, insertEmployees, generateSecretSanta, employeeAssignList, employeeAssignExport};
