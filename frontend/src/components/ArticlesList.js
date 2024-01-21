import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => {
	return (
		<>
			{articles.map((article) => (
				<Link
					key={article.name}
					to={`/articles/${article.name}`}
					className="article-list-item"
				>
					<div className="article-list-item-wrapper">
						<div className="article-list-item-text-wrapper">
							<h3>{article.title}</h3>
							<p>{article.content[0].substring(0, 150)}...</p>
						</div>
					</div>
				</Link>
			))}
		</>
	);
};

export default ArticleList;
