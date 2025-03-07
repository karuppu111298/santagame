const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, default: '' },
    refreshToken: { type: String },
    createdAt: { type: Date, default: Date.now }
  });
  

  userSchema.pre('save', async function (next) {
      if (this.isModified('password')) {
          this.password = await bcrypt.hash(this.password, 10);
      }
      next();
  });

  userSchema.methods.comparePassword = function (password) {
      return bcrypt.compare(password, this.password);
  };

  const User = mongoose.model('User', userSchema);
  
  module.exports = User;