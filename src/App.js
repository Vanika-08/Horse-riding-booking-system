import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import MainSection from './MainSection';
import HorsesList from './HorsesList';
import BookingForm from './BookingForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /><br></br>
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/horses" element={<HorsesList />} />
          <Route path="/booking" element={<BookingForm />} />
        </Routes>
        <ToastContainer  autoClose={3000} /> 
      </div>
    </Router>
  );
}

export default App;