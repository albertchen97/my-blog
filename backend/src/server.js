import fs from "fs";
import admin from "firebase-admin";
import express from "express";
import { db, connectToDb } from "./db.js";

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
	credential: admin.credential.cert(credentials),
});

const app = express();
const port = 8000;
app.use(express.json());

// Identity and Access Management (IAM)
// User Authentication (Identity): Verify the user logged in on the front-end is a valid user
// User Authorization (Access): Allow the authenticated user to upvote and comment and article but can only upvote once

// Use an Express middleware to get the user credentials from the front end via HTTP and authenticate the user
app.use(async (req, res, next) => {
	// Get the authtoken from the HTTP request headers sent by the front end
	const { authtoken } = req.headers;

	// If there is an authtoken, verify it and load the corresponding user
	if (authtoken) {
		try {
			req.user = await admin.auth().verifyIdToken(authtoken);
		} catch (e) {
			// Handle the exception of an invalid authtoken or somebody is trying to hack the server
			return res.sendStatus(400);
		}
	}

	// Handle the case where "req.user" could be "undefined" (the user is not logged in but want to read the articles);
	// Set "req.user" to an empty object to avoid the error of assigning "uid" with an "undefined" variable in the request handlers below
	req.user = req.user || {};

	// Call the next() callback function to execute the request handlers below
	next();
});

// Endpoint for front end to query article information
app.get("/api/articles/:name", async (req, res) => {
	// Query MongoDB using the ":name" URL parameter
	const { name } = req.params;

	// Get the user ID from the request body
	const { uid } = req.user;

	// Fetch the first document that matches the filter (documents that contains the name of the article)
	const article = await db.collection("articles").findOne({ name });

	// If the article exists
	if (article) {
		// Check whether or not the user has already upvoted the article
		const upvotedUids = article.upvotedUids || [];

		// Add a "canUpvote" property to the article object
		article.canUpvote = uid && !upvotedUids.includes(uid);

		// Send a JSON response to the client
		res.json(article);
	}
	// If the article doesn't exist
	else {
		// Send the 404 HTTP status code
		res.sendStatus(404);
	}
});

// Use an Express middleware protect the upvote and comment endpoints from invalid users
app.use((req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.sendStatus(401);
	}
});

// Upvote endpoint
app.put("/api/articles/:name/upvote", async (req, res) => {
	const { name } = req.params;
	const { uid } = req.user;

	// Load the updated article
	const article = await db.collection("articles").findOne({ name });

	// If the article exists
	if (article) {
		// Check whether or not the user has already upvoted the article
		const upvotedUids = article.upvotedUids || [];

		// Check if the user can upvote
		const canUpvote = uid && !upvotedUids.includes(uid);

		if (canUpvote) {
			await db.collection("articles").updateOne(
				{ name },
				{
					// Increament "upvotes" by 1
					$inc: {
						upvotes: 1,
					},
					// Add the upvoted user ID to the database
					$push: {
						upvotedUids: uid,
					},
				}
			);
			const updatedArticle = await db
				.collection("articles")
				.findOne({ name });
			res.json(updatedArticle);
		}
	} else {
		res.send("That article doesn't exist!");
	}
});

// Comment endpoint
app.post("/api/articles/:name/comments", async (req, res) => {
	const { name } = req.params;
	const { text } = req.body;
	const { email } = req.user;

	// Push the new comment into the articles collection with the given "postedBy" and "text" values
	await db.collection("articles").updateOne(
		{ name },
		{
			$push: {
				comments: {
					postedBy: email,
					text,
				},
			},
		}
	);

	// Load the updated article
	const article = await db.collection("articles").findOne({ name });

	if (article) {
		res.json(article);
	} else {
		res.send("That article doesn't exist!!");
	}
});

connectToDb(() => {
	console.log("Successfully connected to database!");
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
	});
});
