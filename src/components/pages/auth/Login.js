import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Login = () => {

    const [user, setUser]=useState({
        email:'',
        password:''
    });

    const handleInputOnChange=(evt)=>{
        const {name,value}=evt.target;
        setUser({...user,[name]:value});
    }

    const handleLoginSubmit= async (evt)=>{
        evt.preventDefault();

        try {
            await axios.post('https://vegonlineserver.herokuapp.com/user/login',{...user});

            localStorage.setItem('firstLogin',true);
            window.location.href ='/';
        } catch (error) {
            alert(error.response.data.msg)
            
        }
    }
    return (
      <div className='auth-container'>
        <form onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
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
            <button type='submit'>Login</button>
            <Link to='/register'>Register</Link>
          </div>
        </form>
      </div>
    );
}

export default Login;
