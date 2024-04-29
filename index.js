const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require('./utils/db');
const app = express();
const port = 3000;
const cors = require("cors");
const authController = require('./Controllers/Auth/auth');

app.use(cors()); // CORS middleware

app.use(function(req, res, next) {
    console.log('middleware chlao ');
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('Hello World this iarab');
});

connectDB();
// Middleware
app.use(express.json());

app.post('/signup', authController.signup);
app.post('/signin', authController.signin);
app.post('/forgetPassword' , authController.forgotPassword)
app.put('/resetPassword' , authController.resetPassword)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
