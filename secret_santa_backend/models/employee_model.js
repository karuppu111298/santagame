const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Employee = mongoose.model('Employee', employeeSchema);
  
  module.exports = Employee;