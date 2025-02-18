const { MongoClient } = require("mongodb");

// Copy the EXACT connection string from MongoDB Atlas
const uri = "mongodb+srv://kothariarnav00:bn5YIpH7xULW5lJH@cluster0.3e6ph.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function testConnection() {
    try {
        // Connect to the MongoDB cluster
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        console.log("Successfully connected to MongoDB!");

        // Test accessing the sample_mflix database
        const db = client.db("sample_mflix");
        const collections = await db.listCollections().toArray();
        console.log("Collections in sample_mflix:", collections.map(c => c.name));

    } catch (e) {
        console.error("Connection error:", e);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the function
testConnection().catch(console.error); 