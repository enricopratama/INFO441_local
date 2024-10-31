import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        console.log("Trying to connect to MongoDB...");
        // Run locally by using brew services start mongodb-community
        await mongoose.connect("mongodb://localhost:27017/playlists");
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// Define the User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    favorite_bands: [String],
});

const User = mongoose.model("User", userSchema);

// Export the models after establishing connection
await connectToDatabase(); // Ensures database connection is attempted

export default { User };
