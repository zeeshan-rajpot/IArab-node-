// const mongoose = require('mongoose')

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://zeeshanrajpot74:zeeshaniarab@zeeshaniarab.j3pvny1.mongodb.net/?retryWrites=true&w=majority&appName=zeeshaniarab', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

// mongoose.connect(``)