import { MongoClient } from "mongodb";
// import "dotenv/config";
let db;
const username = encodeURIComponent(process.env.MONGO_USERNAME);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);

// MongoDB Atlas charges based on queries, so it's turned off. Turn it on on their platform if you want to use it later.

let uri = `mongodb+srv://node-server:${password}@cluster0.h2w99ak.mongodb.net/?retryWrites=true&w=majority`;

async function connectToDb(callback) {
	// Connect Mongo client to the MongoDB server
	const client = new MongoClient(uri);
	await client.connect();

	// Load the 'react-blog-db' database from MongoDB
	db = client.db("react-blog-db");

	callback();
}

export { db, connectToDb };
