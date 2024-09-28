const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash('adminpassword', 10);

    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

createAdminUser();