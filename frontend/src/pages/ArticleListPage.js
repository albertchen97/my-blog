import ArticleList from "../components/ArticlesList";

// TODO: Fetch the articles from the database instead
import articles from "./article-content";

const ArticleListPage = () => {
	return (
		<>
			<ArticleList articles={articles} />
		</>
	);
};

export default ArticleListPage;
