const mongoose = require("mongoose");
const dns = require("dns")
dns.setServers([
    "1.1.1.1", "8.8.8.8"
]);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // changed MONGO_URL → MONGODB_URL
        console.log(`MongoDB Connected successfully`);
    } catch (error) {
        console.error(`database not connect`, error.message);
        process.exit(1);
    }
}

module.exports = connectDB;