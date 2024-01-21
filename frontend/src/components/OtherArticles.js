import { Link } from "react-router-dom";
import articles from "../pages/article-content";

const OtherArticles = ({ currentArticle }) => {
	const otherArticles = articles.filter(
		(article) => article.name !== currentArticle.name
	);

	return (
		<>
			{otherArticles.map((article) => (
				<Link
					key={article.name}
					to={`/articles/${article.name}`}
					// className="article-list-item"
				>
					<div className="article-list-item-wrapper">
						<div className="otherarticle-list-item">
							<p>{article.title}</p>
							{/* <p>{article.content[0].substring(0, 150)}...</p> */}
						</div>
					</div>
				</Link>
			))}
		</>
	);
};

export default OtherArticles;
