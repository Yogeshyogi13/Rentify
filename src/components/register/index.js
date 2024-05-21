import React, { useState } from 'react';
import { userData } from '../../backEnd';
import { buyerData } from '../../buyerData';
import { sellerData } from '../../sellerData';
const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }

    if (!lastName) {
      errors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Valid email is required';
    }

    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      errors.phone = 'Valid phone number is required (10 digits)';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (!role) {
      errors.role = 'Role is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const userExists = userData.some((user) => user.email === email);
      if (userExists) {
        setMessage('User already exists');
      } else {
        const newUser = {
          firstName,
          lastName,
          email,
          phone,
          password,
          role,
        };

        userData.push(newUser);

        const updatedData = `const userData = ${JSON.stringify(userData, null, 2)};\n\nexport default userData;`;
        const blob = new Blob([updatedData], { type: 'text/javascript' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'backenddata.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if(role==='buyer'){
            buyerData.push(newUser)
            console.log(buyerData);
        }
        else{
                  sellerData.push(newUser)
                  console.log(sellerData);
        }
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setRole('');

        setMessage('Registration successful');
      }
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Register</h1>
        {message && <p className="message">{message}</p>}
        <div className="form-group">
          <label className="label">First Name:</label>
          <input
            className="input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="form-group">
          <label className="label">Last Name:</label>
          <input
            className="input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
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
          <label className="label">Phone Number:</label>
          <input
            className="input"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
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
        <div className="form-group">
          <label className="label">Role:</label>
          <select
            className="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}
        </div>
        <button className="button" type="button" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;

