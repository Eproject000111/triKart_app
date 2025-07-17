const mongoose = require('mongoose');

const { DB_CON_STRING } = process.env;

global.isConnected = 0;

/* mongoose.connection.readyState	Meaning
0	Disconnected
1	Connected ✅
2	Connecting (in progress)
3	Disconnecting
 */

module.exports = async () => {
   /*  if (isConnected === 1) {
        console.log("⚡ Using existing database connection");
        return;
    } */

    try {

       let conn = await mongoose.connect(DB_CON_STRING, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ server setup Successfully!`);

        return mongoose.connections[0].readyState;

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        return mongoose.connections[0].readyState;
        // process.exit(1);
    }
}

/* const connectDB = async () => {

    try {
        await mongoose.connect('mongodb+srv://ajay4648:test4648@cluster0.dwljcj3.mongodb.net/?retryWrites=true&w=majority', {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
    }
};

module.exports = connectDB; */
