const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        // Log to verify that the Mongo URI is being loaded correctly
        console.log('MONGO_URL:', process.env.MONGO_URL); 

        await mongoose.connect(process.env.MONGO_URL); // Clean connection

        console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`MongoDB Server Issue: ${error}`.bgRed.white);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
