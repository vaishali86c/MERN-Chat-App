// main entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
// const PORT = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// moongo Db connection
// {useNewUrlParser: true, useUnifiedTopology: true}

const dbURL = 'mongodb+srv://vaishali86c:LZgzwUdvLjVNKH7I@cluster0.lnioyky.mongodb.net/chatapp';
mongoose.connect(dbURL)
    .then(() => {
        console.log('connected to MongoDb');
       
    })
    .catch((err) => console.log("Error connecting to mongo: ", err));

    
app.listen(5000);