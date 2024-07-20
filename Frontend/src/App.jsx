import React, {useEffect, useState}from 'react';
import AddSchool from './Component/AddSchool'; 
import axios from 'axios';
import "./index.css"
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ShowSchool from './Component/ShowSchool';

function App() {

  const [data,setData] = useState();
  useEffect(() => {
    const fetchSchool = async () => {
      const response = await axios.get('http://localhost:8081/school/getSchools');
      setData(response.data)

    };
    fetchSchool();
  });

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ShowSchool School={data}/>} />
        <Route path="/show" element={<AddSchool School={data}/>} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
