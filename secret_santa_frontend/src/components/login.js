import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api.service";
import './login.css';
const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ user_name: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.user_name) {
      newErrors.user_name = "Field is Required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_name)) {
      newErrors.user_name = "Invalid email format!";
    }

    if (!formData.password) {
      newErrors.password = "Field is Required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        Api.login(formData)
      .then((response) => {
        if (response.data.status === false) {
          alert(response.data.message);
        }else{
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        alert("Login failed");
      });
      
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-main">
    <div className="login-container">
      <div className="login-image">
        <img src="/assets/images/1.png" alt="Login Illustration" />
      </div>
      <div className="login-form">
        <div className="mb-5 d-flex">
          <a href="#">
            <img src="/assets/images/2.png" className="sign-favicon-a ht-40" alt="logo" />
          </a>
          <h1 className="main-logo1 ms-1 me-0 my-auto tx-28">PostVibe</h1>
        </div>
        <h2>Welcome back!</h2>
        <p>Please sign in to continue.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user_name">Email</label>
          <input
            type="email"
            id="user_name"
            name="user_name"
            className="form-control"
            value={formData.user_name}
            onChange={handleChange}
          />
          {errors.user_name && <div className="error">{errors.user_name}</div>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <button type="submit" className="btn btn-primary btn-block mb-4" disabled={!formData.user_name || !formData.password}>
            Sign in
          </button>
        </form>
        <div className="form-footer">
          <p>Don't have an account? <a href="/register">Create an Account</a></p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
