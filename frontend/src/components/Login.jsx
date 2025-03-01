import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { isLoggedIn, login } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/profile");
		}
	}, [isLoggedIn, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(
				"/api/users/login",
				{ email, password },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				login();
				navigate("/profile");
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
			className="d-flex justify-content-center align-items-center vh-100"
			style={{
				backgroundImage:
					"url('https://source.unsplash.com/1600x900/?technology,login')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="card bg-dark text-white p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
				<h2 className="text-center mb-4">Login</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-3 input-group">
						<span className="input-group-text bg-secondary text-white">
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
						<span className="input-group-text bg-secondary text-white">
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
					<div className="d-flex justify-content-between align-items-center">
						<p className="mb-0">
							Don{"'"}t have an account?{" "}
							<Link to="/signup" className="text-info text-decoration-none">
								Signup
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
								"Login"
							)}
						</button>
					</div>
				</form>
				{error && <div className="mt-3 text-danger text-center">{error}</div>}
			</div>
		</div>
	);
}

export default Login;
