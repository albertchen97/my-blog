import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
const port = 8000;
app.use(express.json());

// Endpoint for front end to query article information
app.get("/api/articles/:name", async (req, res) => {
	// Query MongoDB using the ":name" URL parameter
	const { name } = req.params;

	// Fetch the first document that matches the filter (documents that contains the name of the article)
	const article = await db.collection("articles").findOne({ name });

	// If the article exists
	if (article) {
		// Send a JSON response to the client
		res.json(article);
	}
	// If the article doesn't exist
	else {
		// Send the 404 HTTP status code
		res.status(404).send("404: Article not found!");
	}
});

// Upvote endpoint
app.put("/api/articles/:name/upvote", async (req, res) => {
	const { name } = req.params;

	await db.collection("articles").updateOne(
		{ name },
		{
			// Increament "upvotes" by 1
			$inc: {
				upvotes: 1,
			},
		}
	);

	const article = await db.collection("articles").findOne({ name });

	if (article) {
		res.send(`The ${name} article now has ${article.upvotes} upvote(s)!!!`);
	} else {
		res.send("That article doesn't exist!");
	}
});

// Comment endpoint
app.post("/api/articles/:name/comments", async (req, res) => {
	const { name } = req.params;
	const { postedBy, text } = req.body;

	// Push the new comment into the articles collection with the given "postedBy" and "text" values
	await db.collection("articles").updateOne(
		{ name },
		{
			$push: {
				comments: {
					postedBy,
					text,
				},
			},
		}
	);

	// Load the updated article
	const article = await db.collection("articles").findOne({ name });

	if (article) {
		res.send(article.comments);
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
