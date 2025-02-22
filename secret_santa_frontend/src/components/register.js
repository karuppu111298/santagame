import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/api.service";

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Field is Required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!formData.password) {
      newErrors.password = "Field is Required!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long!";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is Required!";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
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
      Api.register({ 
        email: formData.email, 
        password: formData.password 
      })
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
        alert("Registration failed");
      });

    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="/assets/images/1.png" alt="Register Illustration" />
      </div>
      <div className="login-form">
        <div className="mb-5 d-flex">
          <a href="#">
            <img src="/assets/images/2.png" className="sign-favicon-a ht-40" alt="logo" />
          </a>
          <h1 className="main-logo1 ms-1 me-0 my-auto tx-28">Santa Game</h1>
        </div>
        <h2>Create an Account</h2>
        <p>Sign up to continue.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}

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

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}

          <button type="submit" className="btn btn-primary btn-block mb-4" disabled={!formData.email || !formData.password || !formData.confirmPassword}>
            Register
          </button>
        </form>
        <div className="form-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
