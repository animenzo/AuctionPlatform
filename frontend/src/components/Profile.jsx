import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ITEMS_PER_PAGE = 3;

function Profile() {
	const [user, setUser] = useState(null);
	

	const [auctions, setAuctions] = useState([]);
	const [bids, setBids] = useState([]);
	const [wonAuctions, setWonAuctions] = useState([]);
	const [currentPageAuctions, setCurrentPageAuctions] = useState(1);
	const [currentPageBids, setCurrentPageBids] = useState(1);
	const [currentPageWon, setCurrentPageWon] = useState(1);
	const [totalPagesAuctions, setTotalPagesAuctions] = useState(1);
	const [totalPagesBids, setTotalPagesBids] = useState(1);
	const [totalPagesWon, setTotalPagesWon] = useState(1);

	useEffect(() => {
		const fetchUserData = async (endpoint, setData, setTotalPages) => {
			const token = document.cookie
				.split("; ")
				.find((row) => row.startsWith("jwt="))
				?.split("=")[1];
			

			if (token) {
				try {
					const res = await axios.post(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
					setData(res.data[Object.keys(res.data)[0]]);
					setTotalPages(Math.ceil(res.data[Object.keys(res.data)[0]].length / ITEMS_PER_PAGE));
					
				} catch (error) {
					console.error(error);
				}
			}
		};

		fetchUserData("/api/users/profile", setUser, () => {});
		fetchUserData("/api/auctions/user", setAuctions, setTotalPagesAuctions);
		fetchUserData("/api/bids/user", setBids, setTotalPagesBids);
		fetchUserData("/api/auctions/won", setWonAuctions, setTotalPagesWon);
	}, []);

	const handlePageChange = (page, type) => {
		if (page > 0) {
			if (type === "auctions" && page <= totalPagesAuctions) setCurrentPageAuctions(page);
			else if (type === "bids" && page <= totalPagesBids) setCurrentPageBids(page);
			else if (type === "won" && page <= totalPagesWon) setCurrentPageWon(page);
		}
	};

	const paginateData = (data, currentPage) => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	};

	if (!user) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="container py-5 text-light bg-dark min-vh-100">
			<div className="card bg-secondary text-light p-4 mb-5">
				<h2 className="mb-3">Profile</h2>
				<p><strong>Username:</strong> {user.username}</p>
				<p><strong>Email:</strong> {user.email}</p>
			</div>

			<div className="d-flex justify-content-between align-items-center mb-4">
				<h2>Your Auctions 🏛️</h2>
				<Link to="/auction/create" className="btn btn-success">Create Auction ➕</Link>
			</div>

			<div className="row">
				{paginateData(auctions, currentPageAuctions).length ? (
					paginateData(auctions, currentPageAuctions).map((auction) => (
						<div key={auction._id} className="col-md-4 mb-4">
							<div className="card bg-dark text-light">
								<div className="card-body">
									<h3 className="card-title">{auction.title}</h3>
									<p className="card-text">{auction.description}</p>
									<p><strong>Starting Bid:</strong> ${auction.startingBid}</p>
									<p><strong>End Date:</strong> {new Date(auction.endDate).toLocaleString()}</p>
									<Link to={`/auction/${auction._id}`} className="btn btn-primary">View Auction 🔍</Link>
								</div>
							</div>
						</div>
					))
				) : <p>No active auctions. Ready to start selling? 💼</p>}
			</div>

			<div className="d-flex justify-content-between">
				<button className="btn btn-outline-light" onClick={() => handlePageChange(currentPageAuctions - 1, "auctions")} disabled={currentPageAuctions === 1}>Previous</button>
				<span>Page {currentPageAuctions} of {Math.max(1, totalPagesAuctions)}</span>
				<button className="btn btn-outline-light" onClick={() => handlePageChange(currentPageAuctions + 1, "auctions")} disabled={currentPageAuctions === totalPagesAuctions}>Next</button>
			</div>

			<h2 className="mt-5">Your Bids 🎭</h2>
			<div className="row">
				{paginateData(bids, currentPageBids).length ? (
					paginateData(bids, currentPageBids).map((bid) => (
						<div key={bid._id} className="col-md-4 mb-4">
							<div className="card bg-dark text-light">
								<div className="card-body">
									<h3 className="card-title">{bid.auctionItem.title}</h3>
									<p className="card-text">{bid.auctionItem.description}</p>
									<p><strong>Bid Amount:</strong> ${bid.bidAmount}</p>
									<p><strong>Bid Date:</strong> {new Date(bid.createdAt).toLocaleString()}</p>
									<Link to={`/auction/${bid.auctionItem._id}`} className="btn btn-primary">View Auction 🔍</Link>
								</div>
							</div>
						</div>
					))
				) : <p>No active bids. Ready to join the excitement? 🚀</p>}
			</div>

			<h2 className="mt-5">🏆 Your Won Auctions 🏆</h2>
			<div className="row">
				{paginateData(wonAuctions, currentPageWon).length ? (
					paginateData(wonAuctions, currentPageWon).map((auction) => (
						<div key={auction.auctionId} className="col-md-4 mb-4">
							<div className="card bg-warning text-dark">
								<div className="card-body">
									<h3 className="card-title">{auction.title}</h3>
									<p className="card-text">{auction.description}</p>
									<p><strong>Winning Bid:</strong> ${auction.winningBid}</p>
									<p><strong>End Date:</strong> {new Date(auction.endDate).toLocaleString()}</p>
									<Link to={`/auction/${auction.auctionId}`} className="btn btn-dark">View Auction 🎉</Link>
								</div>
							</div>
						</div>
					))
				) : <p>No wins yet. Keep bidding! 🎯</p>}
			</div>
		</div>
	);
}

export default Profile;
 