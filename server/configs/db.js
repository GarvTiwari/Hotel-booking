import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
     {
      console.log("Database Connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;



// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const MONGO_URI = `${process.env.MONGODB_URI}/hotel-booking`;

//     mongoose.connection.on("connected", () => {
//       console.log("✅ Database Connected");
//       console.log("📌 Connected to URI:", MONGO_URI);
//     });

//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
    
//   } catch (error) {
//     console.log(" MongoDB Connection Error:", error.message);
//   }
// };

// export default connectDB;
