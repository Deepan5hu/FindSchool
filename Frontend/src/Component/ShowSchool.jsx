import React from 'react';
import CustomNavbar from './CustomNavbar';
import PropTypes from 'prop-types';
import '../Assets/card.css';

const ShowSchool = ({ School = [] }) => {
  return (
    <div>
      <CustomNavbar />
      <h1 style={{textAlign:"center", color:"darkblue"}}>Schools</h1>
      <div className="container">
        <div className="row">
          {School.map((school) => (
            <div key={school.id} className="col">
              <div className="card">
                <img 
                  src={`${school.image}`} 
                  className="card-img-top" 
                  alt={school.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{school.name}</h5>
                  <p className="card-text">{school.contact}</p>
                  <p className="card-text">{school.email_id}</p>
                  <p className="card-text">{school.address}</p>
                  <p className="card-text">{school.city}</p>
                  <p className="card-text">{school.state}</p>
                  <a href="#" className="btn">Apply Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ShowSchool.propTypes = {
  School: PropTypes.array,
};

export default ShowSchool;
