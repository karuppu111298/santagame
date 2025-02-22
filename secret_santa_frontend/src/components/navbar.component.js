import React,{useState,useEffect} from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');



  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();  
  };

   useEffect(() => {
          const user_rec = JSON.parse(localStorage.getItem("user"));
          if (user_rec.user && user_rec.user.name) {
              setUserName(user_rec.user.name);
            }
            console.log('use',user_rec);
      }, []);
     
    return (
    <div>
        <div class="page-container">
            <div class="page-header">
                <div class="header-row">
                    <div class="header-left-side">
                        <div class="header-toggle-menu">
                            <i data-feather="align-left" class="header-toggle-icon"></i>
                        </div>
                        <div class="header-search ms-3">
                            {/* <input class="form-control search-box" placeholder="Search for anything..." type="search">  */}
                            <i class="fa fa-search search-icon"></i>
                        </div>
                    </div>
                    <div class="header-right-side">
                    <div class="header-right-side-icon">
                       <span>{userName}</span>
                    </div>
                    <div class="header-right-side-icon">
                    </div>
                    <div class="header-right-side-icon">
                      <button type="button" className="btn-primary btn-sm" onClick={handleLogout}> Logout </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    );
}

export default Navbar;
