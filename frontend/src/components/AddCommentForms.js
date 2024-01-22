import { useState } from "react";
import axios from "axios";

const AddCommentForms = ({ articleName, onArticleUpdated }) => {
	const [name, setName] = useState("");
	const [commentText, setCommentText] = useState("");

	const addComment = async () => {
		const response = await axios.post(
			`/api/articles/${articleName}/comments`,
			{
				postedBy: name,
				text: commentText,
			}
		);
		const updatedArticle = response.data;
		onArticleUpdated(updatedArticle);
		setName("");
		setCommentText("");
	};

	return (
		<div id="add-comment-form">
			<h3>Add a Comment:</h3>
			<label>
				Name:
				<input
					// Two-Way Binding
					// Binds input value to the "name" state
					value={name}
					// Binds the "name" state to the current input value
					onChange={(e) => setName(e.target.value)}
					type="text"
				/>
			</label>
			<label>
				Comment:
				<textarea
					// Two-Way Binding
					// Binds value to the "commentText" state
					value={commentText}
					// Binds "commentText" state to the value in the text area
					onChange={(e) => setCommentText(e.target.value)}
					rows="4"
					cols="50"
				/>
			</label>
			<button onClick={addComment}>Add Comment</button>
		</div>
	);
};

export default AddCommentForms;
