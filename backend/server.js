// main entry point
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// const PORT = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json());S

// moongo Db connection

const dbURL = '';