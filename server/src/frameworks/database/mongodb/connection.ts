import mongoose from 'mongoose';
import configKeys from '../../../config';
mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      dbName: configKeys.DB_NAME
    });
    console.log(`Database connected successfully`.bg_green);
  } catch (error: any) {
    console.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
};
export default connectDB;
