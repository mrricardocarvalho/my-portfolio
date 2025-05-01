import React, { useEffect, useLayoutEffect } from 'react'; // Import useEffect, useLayoutEffect

// Import Section Components
import ResumeSection from './ResumeSection';
import ProjectsSection from './ProjectsSection';
import BlogSection from './BlogSection';

// Import Data (Only resume data needed here for ResumeSection)
import resumeData from '../data/resume';

// Receives activeTab as a prop from App.jsx
function PortfolioView({ activeTab }) {

  // Use useLayoutEffect for scroll restoration to run after render but before paint
  useLayoutEffect(() => {
    // Only restore if the Blog tab is the active one being rendered
    if (activeTab === 'Blog') {
      const savedPos = sessionStorage.getItem('blogScrollPos');
      if (savedPos) {
        // console.log('PortfolioView: Restoring scroll pos:', parseInt(savedPos, 10)); // Debugging
        window.scrollTo(0, parseInt(savedPos, 10));
        // Optional: Clear the saved position after restoring?
        // If you clear it here, switching tabs and back won't restore.
        // Let's leave it for now, it gets overwritten on next blog link click anyway.
        // sessionStorage.removeItem('blogScrollPos');
      }
      // } else {
      // console.log('PortfolioView: Not restoring scroll (activeTab is not Blog)'); // Debugging
    }
  }, [activeTab]); // Rerun effect if activeTab changes


  // Example potential cleanup (Optional and potentially complex)
  useEffect(() => {
    // This cleanup runs when the component unmounts *or* before the effect re-runs
    // It's hard to reliably know *why* it's running without more state.
    // For simplicity, we are currently NOT clearing the sessionStorage here.
    return () => {
      // console.log('PortfolioView cleanup/unmount');
      // If you wanted to clear when navigating *away* from the portfolio entirely:
      // sessionStorage.removeItem('blogScrollPos');
      // sessionStorage.removeItem('shouldRestoreScroll');
    };
  }, []); // Empty dependency array


  return (
    // Renders the active section based on the prop
    <div>
      {activeTab === 'Resume' && (
        <ResumeSection
          experience={resumeData.experience}
          education={resumeData.education}
        />
      )}
      {activeTab === 'Projects' && (
         <ProjectsSection />
      )}
      {activeTab === 'Blog' && (
         <BlogSection />
      )}
    </div>
  );
}

export default PortfolioView;