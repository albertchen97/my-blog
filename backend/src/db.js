import { MongoClient } from "mongodb";
let db;

async function connectToDb(cb) {
	// Connect Mongo client to the MongoDB server
	const client = new MongoClient("mongodb://127.0.0.1:27017");
	await client.connect();

	// Load the 'react-blog-db' database from MongoDB
	db = client.db("react-blog-db");

	cb();
}

export { db, connectToDb };
