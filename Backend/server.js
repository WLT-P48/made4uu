const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Essential for Frontend communication
require('dotenv').config();

const app = express();

app.use(express.json()); // Essential for reading form data
app.use(cors()); 

mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log('Connected to DB!'))
  .catch((err) => console.error('DB Connection Error:', err));

const authRoute = require('./routes/auth');
app.use('/api/user', authRoute); // This makes the URL: /api/user/register

app.listen(5000, () => console.log('Server Up and Running on port 5000'));