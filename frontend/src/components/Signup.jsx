import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/profile");
		}
	}, [isLoggedIn, navigate]);

	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(
				"/api/users/register",
				{ username, email, password, confirmPassword },
				{ withCredentials: true }
			);
			if (res.status === 201) {
				navigate("/login");
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center min-vh-100"
			
		>
			<div className="card bg-dark text-white p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", opacity: 0.9 }}>
				<h2 className="text-center mb-4">Signup</h2>
				<form onSubmit={handleSignup}>
					<div className="mb-3 input-group">
						<span className="input-group-text bg-secondary text-light">
							<FiUser />
						</span>
						<input
							type="text"
							className="form-control bg-dark text-white border-secondary placeholder-secondary"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3 input-group">
						<span className="input-group-text bg-secondary text-light">
							<FiMail />
						</span>
						<input
							type="email"
							className="form-control bg-dark text-white border-secondary"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3 input-group">
						<span className="input-group-text bg-secondary text-light">
							<FiLock />
						</span>
						<input
							type="password"
							className="form-control bg-dark text-white border-secondary"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="mb-3 input-group">
						<span className="input-group-text bg-secondary text-light">
							<FiLock />
						</span>
						<input
							type="password"
							className="form-control bg-dark text-white border-secondary"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>

					<div className="d-flex justify-content-between align-items-center">
						<p className="mb-0">
							Already have an account?{" "}
							<Link to="/login" className="text-primary">
								Login
							</Link>
						</p>
						<button
							type="submit"
							className="btn btn-primary"
							disabled={loading}
						>
							{loading ? (
								<AiOutlineLoading3Quarters className="spinner-border spinner-border-sm" />
							) : (
								"Signup"
							)}
						</button>
					</div>
				</form>

				{error && <div className="mt-3 text-danger text-center">{error}</div>}
			</div>
		</div>
	);
}

export default Signup;
