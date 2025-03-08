import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaGavel, FaRocket, FaUserPlus, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="bg-light text-dark">
    
      <section className="bg-white py-5 text-center shadow-sm">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to BidKar</h1>
          <p className="lead text-muted">Bid. Win. Own. The best auction platform for all your needs.</p>
          <Link to="/auctions" className="btn btn-outline-dark btn-lg mt-3">Explore Auctions</Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4 text-secondary">Why Choose BidKar?</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4">
              <FaLock size={40} className="text-secondary mb-3" />
              <h3 className="text-secondary">Secure Bidding</h3>
              <p className="text-muted">Enjoy a safe and transparent bidding experience.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4">
              <FaGavel size={40} className="text-secondary mb-3" />
              <h3 className="text-secondary">Best Deals</h3>
              <p className="text-muted">Find valuable items at competitive prices.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4">
              <FaRocket size={40} className="text-secondary mb-3" />
              <h3 className="text-secondary">Easy & Fast</h3>
              <p className="text-muted">Start bidding in just a few clicks.</p>
            </div>
          </div>
        </div>
      </section>

   
      <section className="bg-white py-5 shadow-sm">
        <div className="container text-center">
          <h2 className="fw-bold text-secondary">How It Works?</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <FaUserPlus size={40} className="text-secondary mb-2" />
              <h3 className="text-secondary">Register</h3>
              <p className="text-muted">Create an account to start bidding.</p>
            </div>
            <div className="col-md-4">
              <FaShoppingCart size={40} className="text-secondary mb-2" />
              <h3 className="text-secondary">Place Your Bid</h3>
              <p className="text-muted">Bid on items you like in real-time.</p>
            </div>
            <div className="col-md-4">
              <FaCheckCircle size={40} className="text-secondary mb-2" />
              <h3 className="text-secondary">Win & Own</h3>
              <p className="text-muted">Win the auction and claim your item.</p>
            </div>
          </div>
        </div>
      </section>

     

    </div>
  );
};

export default Home;
