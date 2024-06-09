import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../styles/loginformpage.css';
import useAuth from 'hooks/useAuth.js';
import axios from 'api/axios.js';

const LOGIN_URL = '/login';
const REGISTER_URL = '/register';

function LoginFormPageComponent() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [signUpMode, setSignUpMode] = useState(false);
    const [error, setErrMsg] = useState(null);
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const handleFormToggle = () => {
        setSignUpMode(!signUpMode);
        setErrMsg(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password || (signUpMode && !formData.email)) {
            setErrMsg('Please fill in all fields');
            return;
        }
        if (signUpMode && !validateEmail(formData.email)) {
            setErrMsg('Invalid email format');
            return;
        }
        if (formData.password.length < 8) {
            setErrMsg('Password must be at least 8 characters long');
            return;
        }
        signUpMode ? register() : login();
    };

    const login = async () => {
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: formData.username, password: formData.password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setAuth(response?.data);
            setFormData({ username: '', email: '', password: '' });
            alert("Login Success");
            navigate('/home', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    };

    const register = async () => {
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: formData.username, password: formData.password, email: formData.email }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setFormData({ username: '', email: '', password: '' });
            alert("Register Success");
            navigate(LOGIN_URL, { replace: true });
            setSignUpMode(false);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
        }
    };

    return (
        <div className="body-register">
            <div className="App">
                <header className="App-header">
                    <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
                        <div className="signin-signup">
                            <form className={`sign-in-form ${!signUpMode ? '' : 'hidden'}`} onSubmit={handleSubmit}>
                                <h2 className="sign-in">Sign in</h2>
                                <div className="error">{error}</div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faUser} className="icon-user" />
                                    <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
                                </div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faLock} className="icon-lock" />
                                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                                </div>
                                <button type="submit" className="btn">Sign in</button>
                                <p className="account-text">Don't have an account? <button type="button" onClick={handleFormToggle}>Sign up</button></p>
                            </form>
                            <form className={`sign-up-form ${signUpMode ? '' : 'hidden'}`} onSubmit={handleSubmit}>
                                <h2 className="sign-up">Sign up</h2>
                                <div className="error">{error}</div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faUser} className="icon-user" />
                                    <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} />
                                </div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faEnvelope} className="icon-envelope" />
                                    <input type="text" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                                </div>
                                <div className="input-field">
                                    <FontAwesomeIcon icon={faLock} className="icon-lock" />
                                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                                </div>
                                <button type="submit" className="btn">Sign up</button>
                                <p className="account-text">Already have an account? <button type="button" onClick={handleFormToggle}>Sign in</button></p>
                            </form>
                        </div>
                        <div className="panels-container">
                            <div className="panel left-panel">
                                <div className="content">
                                    <h3>Already a Member?</h3>
                                    <p>Our interests, your people, your space. Sign in to continue the adventure.</p>
                                    <button className="btn" onClick={handleFormToggle}>Sign in</button>
                                </div>
                                <img src="signin.svg" alt="" className="image" />
                            </div>
                            <div className="panel right-panel">
                                <div className="content">
                                    <h3>Are you new to the Community App ?</h3>
                                    <p>Begin your journey in a world of communities - where every hobby finds its home.</p>
                                    <button className="btn" onClick={handleFormToggle}>Sign up</button>
                                </div>
                                <img src="signup.svg" alt="" className="image" />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default LoginFormPageComponent;
