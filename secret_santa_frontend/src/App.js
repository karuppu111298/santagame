import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar.component";
import Sidebar from "./components/sidebar.component";
import Login from './components/login';
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import Employee from "./components/employee";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({ user: JSON.parse(user) });
    }
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;

    return (
      <div>

        {user && (
          <>
            <Sidebar />
            <Navbar handleLogout={this.handleLogout} />
          </>
        )}
        
          <Routes>
           
            <Route 
              path="/" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
             <Route 
              path="/employee" 
              element={user ? <Employee /> : <Navigate to="/employee" />} 
            />
             <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login setUser={(user) => this.setState({ user })} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/" /> : <Register setUser={(user) => this.setState({ user })} />} 
            />
          </Routes>
      </div>
    );
  }
}

export default App;
