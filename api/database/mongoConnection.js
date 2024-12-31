import mongoose from "mongoose";

export const connectToDatabase = () => {
    const databaseUri = process.env.MONGO_URI;

    mongoose.connect(databaseUri, {
        useNewUrlParser: true, // Use the new URL parser
        useUnifiedTopology: true, // Ensure compatibility with the new MongoDB driver
    })
    .then(() => {
        console.log("✅ Connected to the MongoDB database successfully!");
    })
    .catch((error) => {
        console.error("❌ Error connecting to the MongoDB database:", error.message);
    });
};