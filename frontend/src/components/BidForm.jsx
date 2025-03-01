import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const BidForm = () => {
    const { id } = useParams();
    const [auctionItem, setAuctionItem] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctionItem = async () => {
            const res = await axios.get(`/api/auctions/${id}`);
            setAuctionItem(res.data);
            setBidAmount(res.data.startingBid || "");
        };
        fetchAuctionItem();
    }, [id]);

    const handleBid = async (e) => {
        e.preventDefault();
        try {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("jwt="))
                ?.split("=")[1];
            await axios.post(
                "/api/bids",
                { auctionItemId: id, bidAmount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate(`/auction/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    if (!auctionItem) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="mb-3 text-center">Place a Bid</h2>
                <div className="alert alert-info">
                    <strong>Starting Bid Amount:</strong> ${auctionItem.startingBid.toFixed(2)}
                </div>
                <form onSubmit={handleBid}>
                    <div className="mb-3">
                        <label className="form-label">Bid Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            min={auctionItem.startingBid}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Place Bid</button>
                </form>
            </div>
        </div>
    );
};

export default BidForm;
