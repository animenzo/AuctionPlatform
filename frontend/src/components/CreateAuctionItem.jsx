import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAuctionItem = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startingBid, setStartingBid] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];
        if (token) {
            try {
                await axios.post("/api/auctions", { title, description, startingBid, endDate }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                navigate("/profile");
            } catch (err) {
                setError("Failed to create auction. Please try again.");
                console.error(err);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Create Auction</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Starting Bid ($)</label>
                                    <input type="number" className="form-control" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} min={0} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">End Date</label>
                                    <input type="datetime-local" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Create Auction</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAuctionItem;
