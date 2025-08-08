import {connect} from 'mongoose';

const dbConnect = async () => {
    try{
        const mongoDbConnection = await connect(process.env.MONGO_URI);
        console.log(`Database connected: ${mongoDbConnection.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

export default dbConnect;