import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
     
   

 
      <section className="bg-light text-dark py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Welcome to AuctionHub</h1>
          <p className="lead">Bid. Win. Own. The best auction platform for all your needs.</p>
          <Link to="/auctions" className="btn btn-primary btn-lg mt-3">Explore Auctions</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
