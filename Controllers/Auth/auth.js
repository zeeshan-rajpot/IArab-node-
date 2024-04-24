const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userSignUpSchema, userDetailSchema } = require('../../Schemas/User/user');
const User = require('../../Models/User/user')

// SignUp controller
exports.signup = async (req, res) => {
    try {
        // Validate request payload
        const { error } = userSignUpSchema(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email is already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(201).json({ 
            token: token,
            message: 'User Created successful'  });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// SignIn controller
exports.signin = async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Debugging: Log user's input password and hashed password retrieved from the database
        console.log('User input password:', req.body.password);
        console.log('Hashed password from database:', user.password);

        // Compare passwords
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token: token,
            message: 'User Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
