import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

function AuctionList() {
    const [auctionItems, setAuctionItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchAuctionItems = async () => {
            const res = await axios.get("/api/auctions");
            setAuctionItems(res.data);
            setSearchResults(res.data);
            setTotalPages(Math.ceil(res.data.length / ITEMS_PER_PAGE));
        };
        fetchAuctionItems();
    }, []);

    useEffect(() => {
        const filterItems = () => {
            const filteredItems = auctionItems.filter((item) => {
                const title = item.title || "";
                const description = item.description || "";
                const startingBid = item.startingBid ? item.startingBid.toString() : "";
                const endDate = item.endDate ? new Date(item.endDate).toLocaleDateString() : "";

                const searchTermString = searchTerm.toLowerCase();
                return (
                    title.toLowerCase().includes(searchTermString) ||
                    description.toLowerCase().includes(searchTermString) ||
                    startingBid.includes(searchTermString) ||
                    endDate.includes(searchTermString)
                );
            });
            setSearchResults(filteredItems);
            setTotalPages(Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 0);
            setCurrentPage(1);
        };
        filterItems();
    }, [searchTerm, auctionItems]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedItems = searchResults.slice(startIndex, endIndex);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Auction Items</h2>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Title, Description, Starting Bid, End Date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ul className="list-group">
                {paginatedItems.map((item) => (
                    <li key={item._id} className="list-group-item">
                        <h5>
                            <Link to={`/auction/${item._id}`} className="text-decoration-none">
                                {item.title}
                            </Link>
                        </h5>
                        <p><strong>{item.description}</strong></p>
                        <p><strong>Starting Bid:</strong> ${item.startingBid}</p>
                        <p><strong>End Date:</strong> {new Date(item.endDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages === 0 ? 1 : totalPages}</span>
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={totalPages === 0 || currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default AuctionList;
