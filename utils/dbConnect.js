import mongoose from 'mongoose';

const connection = {};

// Function created to connect to the database.
async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    // Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.
    mongoose.set('strictQuery', true);

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
