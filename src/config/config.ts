const user = 'cafezen_admin';
const password = 'Daryin231508';
const bdatos = 'WorkManager';
const sessionDuration = 10800; //in Seconds
export default {
    ApiEnv:{
        PORT: process.env.PORT || 3002,
        SESSION: process.env.SESSION || sessionDuration
    },
    DB: {
        MONGO_URI: process.env.MONGODB_URI || `mongodb+srv://${user}:${password}@cafezen.ppzxezy.mongodb.net/${bdatos}?retryWrites=true&w=majority`,
    },
    jwtSecret: process.env.JWT_KEY || 'passwordFileManagerTest'
}