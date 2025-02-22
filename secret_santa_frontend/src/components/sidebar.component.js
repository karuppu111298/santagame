import React, { useState, Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }


  render() {

  return (
    <div>
     
<div class="page-sidebar">
    <div class="sidebar-header">
        <a class="" href="index.html">
          {/* <img src="assets/images/logo.png" class="sidebar-header-logo" alt="logo"> */}
          </a>
    </div>
    <div class="sidebar-menu">
       
        <div class="side-menu-items">
            <ul>
                <li class="side-menu-items-category">Main</li>
                <li class="slide">
                <Link to="/">
                    <a   class="side-menu-item-child" data-bs-toggle="collapse" href="javascript:void(0);" aria-expanded="false" aria-controls="mainCollapse">
                        <svg xmlns="http://www.w3.org/2000/svg" class="side-menu-item-child-icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z" opacity=".3"></path><path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z"></path></svg>
                        <span class="side-menu-item-child-lable">Dashboard</span>
                        <i data-feather="chevron-right" class="side-menu-item-child-arrow"></i>
                    </a>
                    </Link>
                    <div class="collapse" id="mainCollapse">
                    <ul>
                      
                    </ul>
                    </div>
                </li>
                <li class="side-menu-items-category">Employee</li>
                <li class="slide">
                <Link to="/employee">
                    <a  class="side-menu-item-child" data-bs-toggle="slide" href="javascript:void(0);">
                        <svg xmlns="http://www.w3.org/2000/svg" class="side-menu-item-child-icon" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 4c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8zm3.5 9.5c-2.33 0-4.32-1.45-5.12-3.5h1.67c.7 1.19 1.97 2 3.45 2s2.76-.81 3.45-2h1.67c-.8 2.05-2.79 3.5-5.12 3.5z" opacity=".3"></path><circle cx="15.5" cy="9.5" r="1.5"></circle><circle cx="8.5" cy="9.5" r="1.5"></circle><path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2zm-.01-14C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
                        <span class="side-menu-item-child-lable">Employee List</span>
                        <i data-feather="chevron-down" class="side-menu-item-child-arrow"></i>
                    </a>
                    </Link>
                </li>
              
            </ul>
        </div>
    </div>
</div>
    </div>
    );
  }
}

export default Sidebar;
