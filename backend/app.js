const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Admin,User, UserP } = require('./users');
const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');

dotenv.config();
// const DBURL = "mongodb://localhost:27017/clgweb";
const DBURL = process.env.MONGODB_URI
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
// app.get('/', (req, res) => {
//     console.log("how are yu3333")
//     res.send('Hello World!');
// })
// Routes
const userRoutes = require('./uses');
app.use('/users', userRoutes);

app.post('/signup', async (req, res) => {
    try {
      console.log(req.body)
      const { name, email, password } = req.body;
      console.log(name, email, password)
      const newUser = new User({ name, email, password });// add name
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });

    }
  });

  app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email, password });
        
        if (!user) {
            console.log("user not found");
            return res.status(401).json({ message: 'Invalid email or password' });
        } else {
            console.log("user found", user.name);
        }
        
        res.json({ 
          message: 'Login successful',
          user: {
              name: user.name,
              email: user.email,
              // Add any other user details you want to include
          }
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

app.post('/adminlogin', async (req, res) => {
  try {
      const { email, password } = req.body;
      let user = await Admin.findOne({ email, password });
      
      if (!user) {
          console.log("user not found");
          return res.status(401).json({ message: 'Invalid email or password' });

      } else {
          console.log("user found");
          // return res.redirect('/Admin-clg')
          return res.status(200).json({ message: 'Login successful', redirectUrl: '/Admin-clg' });

      }
      
      // res.json({ 
      //   message: 'Login successful',
      //   user: {
      //       name: user.name,
      //       email: user.email,
      //       // Add any other user details you want to include
      //   }
    // });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
  }
});


  app.get('/userlist', async (req, res) => {
      const all = await User.find();

      res.status(200).json(all);
      console.log("send Successfully")
      

  })


  // prathmesh Backend for  Admin panel 

  // const path =require('path');
// const UserP =require('./users');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/Admin-clg',(req,res)=>{
    res.render("index");
})
app.get('/',(req,res)=>{
  res.render("index");
})

app.get('/read', async (req,res)=>{
  let users = await UserP.find();
  res.render("read", {users});
})
app.get('/readcourse', async (req, res) => {
  try {
    const users = await UserP.find();  // Fetch data from the database
    res.status(200).json(users);       // Send the data as JSON to the frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/create', async (req,res)=>{
  let {Coursename, Department, Duration, Eligibility, Fees, Intake} = req.body;
  let createduser= await UserP.create({
      Coursename, Department, Duration, Eligibility, Fees, Intake
  })
  res.redirect('/read');
})

app.get('/delete/:id', async (req,res)=>{
  let users = await UserP.findOneAndDelete({_id: req.params.id});
  res.redirect('/read');
})

app.get('/edit/:userid', async (req,res)=>{
  let users = await UserP.findOne({_id: req.params.userid});
  res.render("edit",{users});
})

app.post('/update/:userid', async (req,res)=>{
  let {Coursename, Department, Duration, Eligibility, Fees, Intake}=req.body;
  let users = await UserP.findOneAndUpdate({_id: req.params.userid},{Coursename, Department, Duration, Eligibility, Fees, Intake},{new:true});
  res.redirect('/read');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

