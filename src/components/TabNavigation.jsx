import React from 'react';

// Using button styles from previous step (taller buttons)
const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    // Using py-3 for height, px-6 for width, mx-1 for spacing (margin less critical with justify-evenly)
    className={`py-3 px-6 mx-1 text-sm font-semibold focus:outline-none transition-colors duration-200 ease-in-out rounded-md
      ${isActive
        ? 'bg-blue-100 text-blue-700' // Active state
        : 'text-gray-500 hover:text-blue-700' // Inactive state
      }`}
  >
    {label}
  </button>
);

function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = ['Resume', 'Projects', 'Blog'];

  return (
    // Changed justify-center to justify-evenly
    <nav className="flex justify-evenly">
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          label={tab}
          isActive={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        />
      ))}
    </nav>
  );
}

export default TabNavigation;