import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import OtherArticles from "../components/OtherArticles";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import AddCommentForms from "../components/AddCommentForms";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
	const [articleInfo, setArticleInfo] = useState({
		upvotes: 0,
		comments: [],
		canUpvote: false,
	});
	const { canUpvote } = articleInfo;
	const { articleId } = useParams();
	const { user, isLoading } = useUser();
	const navigate = useNavigate();

	// Use the useEffect() hook to synchronize the the ArticlePage component's state with the server data when first loading the page or articleId changes
	useEffect(() => {
		const loadArticleInfo = async () => {
			// If "user" exists (i.e., logged in), get the user token
			const token = user && (await user.getIdToken());
			const headers = token ? { authtoken: token } : {};

			// Get the article for the current user from the server:
			// 1. Send the ID token of the user to the server via the HTTP header to verify the user's identity
			// 2. If the user is verified, the server will respond with the requested data (i.e., article)
			const response = await axios.get(`/api/articles/${articleId}`, {
				headers,
			});
			const newArticleInfo = response.data;
			setArticleInfo(newArticleInfo);
		};

		// ? If the user is loaded (signed in), load the article info
		if (!isLoading) {
			loadArticleInfo();
		}
	}, [articleId, isLoading, user]);

	const article = articles.find((article) => article.name === articleId);

	// Update the upvotes in the server and update the article object
	const addUpvote = async () => {
		// If "user" exists (i.e., logged in), get the user token
		const token = user && (await user.getIdToken());
		const headers = token ? { authtoken: token } : {};

		// Update the upvotes
		// 1. Send the ID token of the user to the server via the HTTP header to verify the user's identity
		// 2. Get the updated article object from the response body
		const response = await axios.put(
			`/api/articles/${articleId}/upvote`,
			null,
			{ headers }
		);
		const updatedArticle = response.data;
		setArticleInfo(updatedArticle);
	};

	if (!article) {
		return <NotFoundPage />;
	}
	return (
		<>
			<h1>{article.title}</h1>
			<div className="upvotes-section">
				{user ? (
					<button onClick={addUpvote}>
						{canUpvote ? "Upvote" : "Already Upvoted"}
					</button>
				) : (
					<button
						onClick={() => {
							navigate("/login");
						}}
					>
						Log in to upvote
					</button>
				)}
				<p className="upvotes">
					This article has <b>{articleInfo.upvotes}</b> upvote(s).
				</p>
			</div>
			{article.content.map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}
			{user ? (
				<AddCommentForms
					articleName={articleId}
					onArticleUpdated={(updatedArticle) =>
						setArticleInfo(updatedArticle)
					}
				/>
			) : (
				<button
					onClick={() => {
						navigate("/login");
					}}
				>
					Log in to add a comment
				</button>
			)}
			<h2>Comments</h2>
			<CommentsList comments={articleInfo.comments} />
			{/* TODO: put otherArticles to the right of the article content */}
			<h2>Check out my other articles:</h2>
			<OtherArticles currentArticle={article} />
		</>
	);
};

export default ArticlePage;
