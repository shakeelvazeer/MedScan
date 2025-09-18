import NavigationBar from "../components/navigationBar";
import Footer from "../components/footer";
import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Homepage from "../pages/homepage";
import SearchPage from "../pages/searchpage";
import SummaryPage from "../pages/summarypage";
import AboutUs from "../pages/aboutus";


const Routers = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/summary-page" element={<SummaryPage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routers;