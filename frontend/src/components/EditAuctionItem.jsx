import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditAuctionItem = () => {
	const { id } = useParams();
	const [auctionItem, setAuctionItem] = useState({
		title: "",
		description: "",
		startingBid: "",
		endDate: "",
	});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAuctionItem = async () => {
			const res = await axios.get(`/api/auctions/${id}`);
			setAuctionItem(res.data);
		};
		fetchAuctionItem();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setAuctionItem((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.put(`/api/auctions/${id}`, auctionItem);
		navigate(`/auction/${id}`);
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6 bg-dark text-white p-4 rounded shadow">
					<h2 className="text-center mb-4">Edit Auction Item</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="title" className="form-label">
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={auctionItem.title}
								onChange={handleChange}
								className="form-control"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={auctionItem.description}
								onChange={handleChange}
								className="form-control"
								rows="4"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="startingBid" className="form-label">
								Starting Bid
							</label>
							<input
								type="number"
								id="startingBid"
								name="startingBid"
								value={auctionItem.startingBid}
								onChange={handleChange}
								className="form-control"
								required
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="endDate" className="form-label">
								End Date
							</label>
							<input
								type="datetime-local"
								id="endDate"
								name="endDate"
								value={auctionItem.endDate}
								onChange={handleChange}
								className="form-control"
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary w-100">
							Update Auction Item
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditAuctionItem;
