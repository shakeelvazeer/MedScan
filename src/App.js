import NavigationBar from "./components/NavigationBar";
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/homepage";
import SearchPage from "./pages/searchpage";
import AboutUs from "./pages/aboutus";

function App() {
  return (
    <BrowserRouter>
      {/* Your main app content goes here */}
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;