import React from 'react';

const SkillTag = ({ skill }) => (
  <span className="bg-gray-200 text-gray-700 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">
    {skill}
  </span>
);

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between text-sm mb-2">
    <span className="font-semibold text-gray-700">{label}</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

// Define base card styling (less padding needed for first card now)
const cardClasses = "bg-white p-6 rounded-lg shadow-sm";
const firstCardClasses = "bg-white rounded-lg shadow-sm overflow-hidden"; // Remove padding, add overflow

function Sidebar({ personalInfo, aboutMe, skills, information }) {
  // Determine availability color (example logic)
  const availabilityColor = information.availability.toLowerCase().includes("available") || information.availability.toLowerCase().includes("month")
    ? 'bg-green-500'
    : 'bg-yellow-500'; // Or 'bg-red-500' etc.

  return (
    // Removed padding from aside, added back if needed for small screens? Adjust width if needed.
    <aside className="w-80 md:w-96 flex-shrink-0 space-y-6 sticky top-0 h-screen overflow-y-auto p-4 md:p-0">

      {/* --- Card 1: Header + Profile Info --- */}
      <div className={firstCardClasses}>
        {/* Background Image & Gradient Container */}
        {/* Adjust height as needed (e.g., h-48, h-56) */}
        <div className="relative h-48 bg-cover bg-center bg-[url('/assets/sidebar-background.jpg')]"> {/* Background Image */}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/30 via-sky-500/10 to-white/60"></div> {/* Adjust colors and opacity */}

          {/* Profile Picture - Absolutely Positioned */}
          <img
            src={personalInfo.profilePictureUrl}
            alt={personalInfo.name}
            // Position bottom-left, slightly offset, adjust size, border
            className="absolute bottom-0 left-6 mb-[-3rem] z-10 w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        {/* Text Content Area Below Background */}
        {/* Added padding top to account for overlapping profile picture */}
        <div className="pt-16 px-6 pb-6"> {/* Adjust pt-16 based on image size/offset */}
           {/* Name and Availability Indicator */}
           <div className="flex items-center mb-1">
              <h1 className="text-xl font-semibold text-gray-800 mr-2">{personalInfo.name}</h1>
              {/* Availability Dot */}
              <span className={`inline-block w-2.5 h-2.5 ${availabilityColor} rounded-full`} title={`Availability: ${information.availability}`}></span>
           </div>
           {/* Title and Location */}
           <p className="text-sm text-gray-500 mb-6">{personalInfo.title} • {personalInfo.location}</p>

           {/* Skills Section */}
           <div className="mb-6 border-t border-gray-100 pt-4">
              <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">Skills</h2>
              <div className="flex flex-wrap">
                {skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
           </div>

           {/* Download CV Button */}
           <a
             href={personalInfo.cvUrl}
             download
             target="_blank"
             rel="noopener noreferrer"
             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center transition duration-150 ease-in-out"
           >
             {/* Icon */}
             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             <span>Download CV</span>
           </a>
        </div>
      </div>

      {/* Card 2: About Me & Contact */}
        <div className={cardClasses}>
          <h2 className="text-lg font-semibold text-blue-600 mb-3">About me</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {aboutMe}
          </p>
           <div className="pt-4 border-t border-gray-100">
             <div className="flex items-center justify-center space-x-6">
               <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                 </svg>
               </a>
               <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center justify-center">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                 </svg>
               </a>
               <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                 </svg>
               </a>
             </div>
           </div>
        </div>

        {/* --- Card 3: Information --- */}
      <div className={cardClasses}>
        <h2 className="text-lg font-semibold text-blue-600 mb-3">Information</h2>
        <InfoItem label="Location" value={information.location} />
        <InfoItem label="Experience" value={information.experience} />
        <InfoItem label="Availability" value={information.availability} />
        <InfoItem label="Relocation" value={information.relocation} />
      </div>

    </aside>
  );
}

export default Sidebar;