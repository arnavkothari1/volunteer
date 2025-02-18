const { MongoClient } = require("mongodb");

// Make sure to use the new username and password you just created
const uri = "mongodb+srv://kothariarnav00:bn5YIpH7xULW5lJH@cluster0.3e6ph.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect(); // Add this line to explicitly connect
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");

        // Query for a movie
        const query = { title: "Back to the Future" };
        const movie = await movies.findOne(query);

        // Add this to see if there's an error
        if (!movie) {
            console.log("No movie found");
        } else {
            console.log("Found movie:");
            console.log(movie);
        }

    } catch (error) {
        // Add error logging
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

// Modify the run call to see errors
run().catch(console.error);

async function testConnection() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        
        // List databases
        const dbs = await client.db().admin().listDatabases();
        console.log("Your databases:", dbs.databases.map(db => db.name));

    } catch (error) {
        console.error("Connection error:", error);
    } finally {
        await client.close(); // Close connection only after all operations
    }
}

testConnection().catch(console.error);