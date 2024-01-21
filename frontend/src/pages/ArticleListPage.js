import ArticleList from "../components/ArticlesList";
import articles from "./article-content";

const ArticleListPage = () => {
	return (
		<>
			<ArticleList articles={articles} />
		</>
	);
};

export default ArticleListPage;
