import { Link, useLocation, useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";
import { getAuth, signOut } from "firebase/auth";

const NavBar = () => {
	const { pathname } = useLocation();
	const { user } = useUser();
	const navigate = useNavigate();

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
			<div className="nav-right">
				{user ? (
					<button
						onClick={() => {
							signOut(getAuth());
						}}
					>
						Log Out
					</button>
				) : (
					<button
						onClick={() => {
							navigate("/login");
						}}
					>
						Log In
					</button>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
