import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import OtherArticles from "../components/OtherArticles";
import articles from "./article-content";
const ArticlePage = () => {
	const { articleId } = useParams();
	const article = articles.find((article) => article.name === articleId);
	if (!article) {
		return <NotFoundPage />;
	}
	return (
		<>
			<h1>{article.title}</h1>
			{article.content.map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}
			<h2>Check out my other articles:</h2>
			<OtherArticles currentArticle={article} />
		</>
	);
};

export default ArticlePage;
