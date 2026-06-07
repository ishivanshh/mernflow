const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log('MongoDB Connected ✅');
    } catch (error) {
        console.error('Database Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDb;