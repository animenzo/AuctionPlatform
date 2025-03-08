import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
	const { isLoggedIn } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
			<div className="container">
				<Link className="navbar-brand text-warning fw-bold" to="/">
					BidKar
				</Link>
			
				<div className=''>
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link text-primary" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-white" to="/auctions">
								Auctions
							</Link>
						</li>
						{!isLoggedIn ? (
							<>
								<li className="nav-item">
									<Link className="nav-link text-white" to="/login">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link text-white" to="/signup">
										Signup
									</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link text-white" to="/profile">
										Profile
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link text-white" to="/logout">
										Logout
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
