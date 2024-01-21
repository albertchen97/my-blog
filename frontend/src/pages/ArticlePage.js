import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import OtherArticles from "../components/OtherArticles";
import articles from "./article-content";

const ArticlePage = () => {
	const { articleId } = useParams();
	const [articleInfo, setArticleInfo] = useState({
		upvotes: 0,
		comments: [],
	});

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
			<p>This article has {articleInfo.upvotes} upvote(s).</p>
			{article.content.map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}
			<h2>Check out my other articles:</h2>
			<OtherArticles currentArticle={article} />
		</>
	);
};

export default ArticlePage;
