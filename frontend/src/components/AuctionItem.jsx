import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ITEMS_PER_PAGE = 10;

function AuctionItem() {
	const { id } = useParams();
	const [auctionItem, setAuctionItem] = useState(null);
	const [user, setUser] = useState(null);
	const [bids, setBids] = useState([]);
	const [winner, setWinner] = useState("");
	const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loadingBids, setLoadingBids] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAuctionItem = async () => {
			try {
				const res = await axios.get(`/api/auctions/${id}`);
				setAuctionItem(res.data);
			} catch (error) {
				console.error("Error fetching auction item:", error);
			}
		};

		const fetchUser = async () => {
			const token = document.cookie.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];
			if (token) {
				try {
					const res = await axios.post("/api/users/profile", {}, { headers: { Authorization: `Bearer ${token}` } });
					setUser(res.data);
				} catch (error) {
					console.error("Error fetching user profile:", error);
				}
			}
		};

		fetchAuctionItem();
		fetchUser();
	}, [id]);

	useEffect(() => {
		const fetchBids = async () => {
			setLoadingBids(true);
			try {
				const res = await axios.get(`/api/bids/${id}`);
				const sortedBids = res.data.sort((a, b) => b.bidAmount - a.bidAmount);
				setBids(sortedBids);
				setTotalPages(Math.ceil(sortedBids.length / ITEMS_PER_PAGE) || 0);
			} catch (error) {
				console.error("Error fetching bids:", error);
			} finally {
				setLoadingBids(false);
			}
		};

		fetchBids();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/auctions/${id}`);
			navigate("/auctions");
		} catch (error) {
			console.error("Error deleting auction item:", error);
		}
	};

	const handlePageChange = (page) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedBids = bids.slice(startIndex, endIndex);

	if (!auctionItem || !user) {
		return <p className="text-center mt-4">Loading...</p>;
	}

	return (
		<div className="container mt-5 p-4 border rounded bg-light">
			<h2 className="text-primary">{auctionItem.title}</h2>
			<p>{auctionItem.description}</p>
			<p><strong>Starting Bid:</strong> ${auctionItem.startingBid}</p>

			<h3 className="mt-4">Bids</h3>
			{loadingBids ? (
				<p>Loading bids...</p>
			) : paginatedBids.length ? (
				<div>
					{paginatedBids.map((bid) => (
						<div key={bid._id} className="p-2 my-2 border rounded bg-white">
							<p><strong>Bidder:</strong> {bid.userId.username}</p>
							<p><strong>Bid Amount:</strong> ${bid.bidAmount}</p>
						</div>
					))}
				</div>
			) : (
				<p>No bids yet.</p>
			)}

			<div className="mt-4">
				<Link to={`/auction/bid/${id}`} className="btn btn-primary me-2">Place a Bid</Link>
				{auctionItem.createdBy === user.id && (
					<button onClick={handleDelete} className="btn btn-danger">Delete</button>
				)}
			</div>
		</div>
	);
}

export default AuctionItem;
