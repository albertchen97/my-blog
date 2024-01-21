import articles from "../pages/article-content";
import ArticleList from "./ArticlesList";

const OtherArticles = ({ currentArticle }) => {
	const otherArticles = articles.filter(
		(article) => article.name !== currentArticle.name
	);
	return <ArticleList articles={otherArticles} />;
};

export default OtherArticles;
