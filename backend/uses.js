const express = require('express');
const User = require('./users');
// const app = express();
const router = express.Router();
// const cors = require('cors');
// app.use(cors());
// Create a new user
// router.post('/create', async (req, res) => {
//   try {
//     console.log("how are yu")
//     const { name, email, password } = req.body;
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// module.exports = User;
module.exports = router;
