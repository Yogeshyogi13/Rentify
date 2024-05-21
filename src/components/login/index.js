import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { userData } from '../../backEnd';
import { placeData } from '../../places/placeData';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % placeData[0].img.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const validate = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Valid email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const user = userData.find((user) => user.email === email);
      if (user && user.password === password) {
        setMessage('Login successful');
        navigate('/profile', { state: { user } }); // Pass user data to the profile page
      } else {
        setMessage('Invalid email or password');
      }
    }
  };

  return (
    <div className="container">
      <div className="info">
        <h1>Looking for Buyers/Sellers ?</h1>
      </div>
      <div className="cards">
        {placeData.map((x) => (
          <div className="card" key={x.place}>
            <h1><b>Location:</b> {x.place}</h1>
            <h2><b>Area:</b> {x.area}</h2>
            <img src={x.img[currentImageIndex]} alt={x.place} />
            <h3>Rent: {x.cost}</h3>
          </div>
        ))}
      </div>
      <div className="form">
        <h1 className="title">Login</h1>
        {message && <p className="message">{message}</p>}
        <div className="form-group">
          <label className="label">Email:</label>
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button className="button" type="button" onClick={handleSubmit}>Login</button>
        <p className="toggle">
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
