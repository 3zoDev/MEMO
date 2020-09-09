const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please enter your name`],
  },
  role: 'admin',
});
