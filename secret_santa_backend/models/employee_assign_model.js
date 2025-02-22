const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeAssignSchema = new mongoose.Schema({
    giver: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    createdAt: { type: Date, default: Date.now }
  });

  const EmployeeAssign = mongoose.model('EmployeeAssign', employeeAssignSchema);
  
  module.exports = EmployeeAssign;