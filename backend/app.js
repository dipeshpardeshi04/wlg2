const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./users');
// const dotenv = require('dotenv');

// dotenv.config();

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dip', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
app.get('/', (req, res) => {
    console.log("how are yu3333")
    res.send('Hello World!');
})
// Routes
const userRoutes = require('./uses');
app.use('/users', userRoutes);

app.post('/create', async (req, res) => {
    try {
    //   console.log(req.body)
      const { name, email, password } = req.body;
      console.log(name, email, password)
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });

    }
  });


  app.get('/userlist', async (req, res) => {
      const all = await User.find();

      res.status(200).json(all);
      console.log("send Successfully")

  })
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
