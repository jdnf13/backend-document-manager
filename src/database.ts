import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

const user = 'cafezen_admin';
const password = 'Daryin231508';
const bdatos = 'WorkManager';

//setting options DB
const DBOption: ConnectOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 100, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

mongoose.set('strictQuery', false);
mongoose.connect(config.DB.MONGO_URI, DBOption);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('connected database');
});

connection.on('error', err => {
    console.log('there was an error connecting to MongoDB');
    process.exit(0);
});