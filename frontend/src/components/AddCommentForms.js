import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForms = ({ articleName, onArticleUpdated }) => {
	const [name, setName] = useState("");
	const [commentText, setCommentText] = useState("");
	const { user } = useUser();

	const addComment = async () => {
		// If "user" exists (i.e., logged in), get the user token
		const token = user && (await user.getIdToken());
		const headers = token ? { authtoken: token } : {};

		// Post a new comment to the server:
		// 1. Send a post request with HTTP headers containing the user token to verify the user
		// 2. If the user is verified, receive the response object
		const response = await axios.post(
			`/api/articles/${articleName}/comments`,
			{
				postedBy: name,
				text: commentText,
			},
			{
				headers,
			}
		);
		const updatedArticle = response.data;

		// Update the article by passing the updatedArticle object to the parent component's state setter
		onArticleUpdated(updatedArticle);
		setName("");
		setCommentText("");
	};

	return (
		<div id="add-comment-form">
			<h3>Add a Comment:</h3>
			{user && (
				<p>
					<i>You are posting as {user.email}</i>
				</p>
			)}
			<textarea
				// Two-Way Binding
				// Binds value to the "commentText" state
				value={commentText}
				// Binds "commentText" state to the value in the text area
				onChange={(e) => setCommentText(e.target.value)}
				rows="4"
				cols="50"
			/>
			<button onClick={addComment}>Add Comment</button>
		</div>
	);
};

export default AddCommentForms;
