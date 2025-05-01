import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './index.css';

// Import Components
import Sidebar from './components/Sidebar';
import TabNavigation from './components/TabNavigation';
import PortfolioView from './components/PortfolioView';
import BlogPostPage from './pages/BlogPostPage';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop

// Import Data
import personalData from './data/personal';

function App() {
  const [activeTab, setActiveTab] = useState('Resume');
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the tab to display based on URL path for visual highlighting
  const displayTab = location.pathname.startsWith('/blog/') ? 'Blog' : activeTab;

  // Function to handle tab clicks
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Set the desired tab state
    // If we are not already on the home page, navigate there
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // Optional: Effect to set active tab based on URL when page loads/changes
  useEffect(() => {
    if (location.pathname === '/') {
       // setActiveTab('Resume'); // Uncomment to always default to Resume on '/'
    }
  }, [location.pathname]);


  return (
    <div className="flex bg-gray-100 p-4 md:p-6">
      <ScrollToTop /> {/* Ensure ScrollToTop is rendered */}
      <Sidebar
        personalInfo={personalData.personalInfo}
        aboutMe={personalData.aboutMe}
        skills={personalData.skills}
        information={personalData.information}
      />
      <main className="flex-grow p-8 ml-6">
        <div className="sticky top-0 z-20 bg-white pt-2 pb-2 px-4 shadow mb-8 rounded-lg">
           <TabNavigation activeTab={displayTab} setActiveTab={handleTabChange} />
        </div>

        <Routes>
          <Route path="/" element={<PortfolioView activeTab={activeTab} />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* <Route path="*" element={<div>404</div>} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;