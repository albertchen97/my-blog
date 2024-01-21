import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
	const { pathname } = useLocation();

	return (
		<nav>
			<ul>
				<li>
					<Link
						className={pathname === "/" ? "currentPage" : ""}
						to="/"
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						className={pathname === "/about" ? "currentPage" : ""}
						to="/about"
					>
						About
					</Link>
				</li>
				<li>
					<Link
						className={
							pathname === "/articles" ? "currentPage" : ""
						}
						to="/articles"
					>
						Articles
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
