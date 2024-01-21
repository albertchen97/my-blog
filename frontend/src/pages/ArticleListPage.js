import { Link } from "react-router-dom";
import ArticleList from "../components/ArticlesList";
import articles from "./article-content";

const ArticleListPage = () => {
	return (
		<>
			{/* <h1>Article</h1> */}
			<ArticleList articles={articles} />
		</>
	);
};

export default ArticleListPage;
