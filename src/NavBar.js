import { Link } from "react-router-dom";

// TODO: When a user is on a specific page, permanently change the link's background color to black (instead of only change when hover over it)
const NavBar = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/articles">Articles</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
