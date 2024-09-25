const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true, // Uncomment if required
  },
  email: {
    type: String,
    // required: true, // Uncomment if required
    unique: true,
  },
  password: {
    type: String,
    // required: true, // Uncomment if required
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Another user schema (for other use cases, if needed)
const usersSchema = new mongoose.Schema({
    Coursename:String,
    Department:String,
    Duration:Number,
    Eligibility:String,
    Fees:Number,
    Intake:Number,
});

const adminSchema = new mongoose.Schema({
  
  email: {  
    type: String,
    // required: true, // Uncomment if required
    // unique: true, 
  },
  password: {
    type: String,
    // required: true, // Uncomment if required
  },
 
});
// Define the models
const User = mongoose.model('User', userSchema);
const UserP = mongoose.model('UserP', usersSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Export models in a single export statement
module.exports = { User, UserP, Admin };
