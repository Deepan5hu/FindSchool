import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../Assets/Navbar.css";

function CustomNavbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();

  const handleToggle = useCallback(() => {
    console.log("handleToggle called");
    setIsNavExpanded((prevIsNavExpanded) => {
      console.log("prevIsNavExpanded:", prevIsNavExpanded);
      return !prevIsNavExpanded;
    });
    console.log("isNavExpanded:", isNavExpanded);
  }, []);

  useEffect(() => {
    console.log("isNavExpanded:", isNavExpanded);
  }, [isNavExpanded]);

  return (
    <nav className='navbar'>
      <div className='container'>
        <Link className='nav-link' to="/">Find School</Link>
        <div className='ham'>
          <button className='navbar-toggle' onClick={handleToggle} aria-expanded={isNavExpanded}>
            &#9776;
          </button>
          <div className={`navbar-collapse ${isNavExpanded ? 'active' : ''}`}>
            <div className='nav text-end'>
              <Link className='nav-link' to="/">Show School</Link>
              <Link className='nav-link' to="/show" onClick={() => navigate('/show')}>Add School</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;