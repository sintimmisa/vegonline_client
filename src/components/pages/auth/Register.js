import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputOnChange = (evt) => {
    const { name, value } = evt.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegisterSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await axios.post('https://vegonlineserver.herokuapp.com/user/register', { ...user });

      localStorage.setItem('firstRegister', true);
      window.location.href = '/';
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className='auth-container'>
      <form onSubmit={handleRegisterSubmit}>
          <h2>Register</h2>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={user.name}
          required
          onChange={handleInputOnChange}
        />

        <input
          type='email'
          name='email'
          placeholder='Email'
          value={user.email}
          required
          onChange={handleInputOnChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={user.password}
          required
          autoComplete='on'
          onChange={handleInputOnChange}
        />

        <div className='row'>
          <button type='submit'>Register</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
