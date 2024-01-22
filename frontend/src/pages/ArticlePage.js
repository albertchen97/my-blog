import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
	});
	const { articleId } = useParams();

	const { user, isLoading } = useUser();

	// Use the useEffect() hook to synchronize the the ArticlePage component's state with the server data when first loading the page or articleId changes.
	useEffect(() => {
		const loadArticleInfo = async () => {
			const response = await axios.get(`/api/articles/${articleId}`);
			const newArticleInfo = response.data;
			setArticleInfo(newArticleInfo);
		};
		loadArticleInfo();
	}, [articleId]);

	const article = articles.find((article) => article.name === articleId);

	// Update the upvotes from the server
	const addUpvote = async () => {
		const response = await axios.put(`/api/articles/${articleId}/upvote`);
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
					<button onClick={addUpvote}>Upvote</button>
				) : (
					<button>Log in to upvote</button>
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
				<button> Log in to add a comment </button>
			)}
			<h2>Comments</h2>
			<CommentsList comments={articleInfo.comments} />
			{/* todo: put otherarticles to the right of the article content */}
			<h2>Check out my other articles:</h2>
			<OtherArticles currentArticle={article} />
		</>
	);
};

export default ArticlePage;
