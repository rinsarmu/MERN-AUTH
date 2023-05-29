import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DATABASE =
      "mongodb://localhost:27017/NewUser" || process.env.DATABASE_LOCAL;
    const conn = await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongoose is connected, ${conn.connection.host}`);
  } catch (err) {
    console.error(`SOmething is   happend in ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
