// Import mongodb module
import { Collection, Document, MongoClient } from 'mongodb'
// URL connection
const url = "mongodb://localhost:27017";
// DB name
const defaultNameDb = "nextcoach"
// Client
let client: MongoClient | undefined;

// Database connection
async function getConnection(): Promise<MongoClient> {
    if (!client) {
        try {
            client = await MongoClient.connect(url);
            console.log("MongoDB connected")
        } catch (err) {
            console.error("Error connecting to MongoDB", err);
            throw err;
        }
    }
    return client;
}

// Close db connection
async function closeConnection(): Promise<void> {
    if (!client) return;
    try {
        await client.close();
        client = undefined;
        console.log ("MongoDB connection closed")
    } catch (err) {
        console.error("Error closing connection to MongoDB", err);
        throw err;
    }
}

// Acess collection in DB
async function getCollection(collectionName: string): Promise<Collection<Document>> {
    const client = await getConnection();
    const db = client.db(defaultNameDb);
    return db.collection(collectionName)
}

// Export connections to other functions
export {getConnection, closeConnection, getCollection}
