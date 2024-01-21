import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import OtherArticles from "../components/OtherArticles";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";

const ArticlePage = () => {
	const [articleInfo, setArticleInfo] = useState({
		upvotes: 0,
		comments: [],
	});
	const { articleId } = useParams();

	// Use the useEffect() hook to synchronize the the ArticlePage component's state with the server data.
	useEffect(() => {
		const loadArticleInfo = async () => {
			const response = await axios.get(`/api/articles/${articleId}`);
			const newArticleInfo = response.data;
			setArticleInfo(newArticleInfo);
		};
		loadArticleInfo();
	}, [articleId]);

	const article = articles.find((article) => article.name === articleId);

	if (!article) {
		return <NotFoundPage />;
	}
	return (
		<>
			<h1>{article.title}</h1>
			<p className="upvotes">
				This article has <b>{articleInfo.upvotes}</b> upvote(s).
			</p>
			{article.content.map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}

			<h2>Comments:</h2>
			{/* {articleinfo.comments?.map((comment) => (
				<div
					classname="comment"
					key={comment.postedby + ": " + comment.text}
				>
					<h4>{comment.postedby}</h4>
					<p>{comment.text}</p>
				</div>
			))} */}
			<CommentsList comments={articleInfo.comments} />

			{/* todo: put otherarticles to the right of the article content */}
			<h2>check out my other articles:</h2>
			<OtherArticles currentArticle={article} />
		</>
	);
};

export default ArticlePage;
