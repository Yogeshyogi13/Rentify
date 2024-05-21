import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { sellerData } from '../../sellerData';


const SellerProfilePage = () => {
  const { sellerId } = useParams();
  const seller = sellerData.find(s => s.id === parseInt(sellerId, 10));

  if (!seller) {
    return <p>Seller not found</p>;
  }

  return (
    <div className="container">
      <div className="profile">
        <h1 className="title">Seller Profile</h1>
        <p><strong>First Name:</strong> {seller.firstName}</p>
        <p><strong>Last Name:</strong> {seller.lastName}</p>
        <p><strong>Email:</strong> {seller.email}</p>
        <p><strong>Phone:</strong> {seller.phone}</p>
        <h2>Listings</h2>
        <div className='items'>
          {seller.listings.map((listing, index) => (
            <div className='card' key={index}>
              <h1><b>Location:</b> {listing.place}</h1>
              <h2><b>Area:</b> {listing.area}</h2>
              <img src={listing.img[0]} alt={listing.place} />
              <h3>Rent: {listing.cost}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
