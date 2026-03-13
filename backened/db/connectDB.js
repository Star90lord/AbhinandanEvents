import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env files
const envFiles = [path.join(__dirname, "..", ".env"), path.join(__dirname, ".env")];
for (const envPath of envFiles) {
  const result = dotenv.config({ path: envPath, override: true });
  if (!result.error && process.env.MONGO_URI) {
    console.log(`Loaded environment variables from: ${envPath}`);
    break;
  }
}

const connectDB = async () => {
  let uri = process.env.MONGO_URI?.trim(); // remove leading/trailing spaces
  if (!uri) throw new Error("MONGO_URI is not defined in .env");

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri); // Mongoose 6+ does not need legacy options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;

// --------------------------------------------
// Standalone test when running `node connectDB.js`
// --------------------------------------------
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  connectDB()
    .then(() => {
      console.log("✅ Test connection successful");
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Test connection failed:", err.message);
      process.exit(1);
    });
}
