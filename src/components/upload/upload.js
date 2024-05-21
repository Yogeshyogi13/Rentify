import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeData } from '../../places/placeData';
import './pages.css';

const UploadPage = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [place, setPlace] = useState('');
  const [area, setArea] = useState('');
  const [cost, setCost] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = () => {
    if (place && area && cost && images.length > 0) {
      const newPlace = {
        place,
        area,
        cost,
        img: images,
      };

      placeData.push(newPlace);
      setMessage('Place added successfully');
      setPlace('');
      setArea('');
      setCost('');
      setImages([]);
    } else {
      setMessage('Please fill in all fields and upload at least one image');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Upload Place</h1>
      {message && <p className="message">{message}</p>}
      <div className="form-group">
        <label className="label">Place:</label>
        <input
          className="input"
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Area:</label>
        <input
          className="input"
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Cost:</label>
        <input
          className="input"
          type="text"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label">Images:</label>
        <input
          className="input"
          type="file"
          multiple
          onChange={handleImageChange}
        />
        {images.length > 0 && (
          <div className="image-preview">
            {images.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} />
            ))}
          </div>
        )}
      </div>
      <button className="button" type="button" onClick={handleSubmit}>Submit</button>
      <button className="button" type="button" onClick={() => navigate('/profile', { state: { user } })}>Back to Profile</button>
    </div>
  );
};

export default UploadPage;
