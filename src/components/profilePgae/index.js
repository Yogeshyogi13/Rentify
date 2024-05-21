import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeData } from '../../places/placeData';
import './pages.css';

const ProfilePage = () => {
  const location = useLocation();
  const { state } = location;
  const { user } = state || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchArea, setSearchArea] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [negate, setNegate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % placeData[0].img.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const changeSearch = (event) => {
    setSearchArea(event.target.value);
  };

  const handleClick = () => {
    setSearchResult(searchArea);
    setSearchArea('');
    setNegate(true);
  };

  const handleUploadClick = () => {
    navigate('/upload', { state: { user } });
  };

  const handleInterestedClick = (sellerId) => {
    navigate(`/seller/${sellerId}`);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <input type="text" placeholder="Search..." onChange={changeSearch} />
          <button onClick={handleClick}>Search</button>
        </div>
        <div className="navbar-right">
          {user && <p>Welcome, {user.firstName}</p>}
        </div>
      </nav>
      <div className="profile">
        <h1 className="title">Profile</h1>
        {user && (
          <>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        )}
      </div>
      {user && user.role === 'seller' && (
        <div>
          <button onClick={handleUploadClick}>Upload Place</button>
        </div>
      )}
      <div className='items'>
        {negate ? (
          placeData
            .filter(x => x.place.toLowerCase().includes(searchResult.toLowerCase()))
            .map((x) => (
              <div className='card' key={x.place}>
                <h1><b>Location:</b> {x.place}</h1>
                <h2><b>Area:</b> {x.area}</h2>
                <img src={x.img[currentImageIndex]} alt={x.place} />
                <h3>Rent: {x.cost}</h3>
                {user && user.role === 'buyer' && <button onClick={() => handleInterestedClick(x.sellerId)}>I am interested</button>}
              </div>
            ))
        ) : (
          placeData.map((x) => (
            <div className='card' key={x.place}>
              <h1><b>Location:</b> {x.place}</h1>
              <h2><b>Area:</b> {x.area}</h2>
              <img src={x.img[currentImageIndex]} alt={x.place} />
              <h3>Rent: {x.cost}</h3>
              {user && user.role === 'buyer' && <button onClick={() => handleInterestedClick(x.sellerId)}>I am interested</button>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
