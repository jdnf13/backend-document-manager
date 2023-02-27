const user = 'cafezen_admin';
const password = 'Daryin231508';
const bdatos = 'WorkManager';
export default {
    ApiEnv:{
        PORT: process.env.PORT || 3002,
    },
    DB: {
        MONGO_URI: process.env.MONGODB_URI || `mongodb+srv://${user}:${password}@cafezen.ppzxezy.mongodb.net/${bdatos}?retryWrites=true&w=majority`,
    },
    jwtSecret: process.env.JWT_KEY || 'passwordFileManagerTest'
}