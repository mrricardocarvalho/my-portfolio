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

// Define card styling to reuse
const cardClasses = "bg-white p-6 rounded-lg shadow-sm";

function Sidebar({ personalInfo, aboutMe, skills, information }) {
  return (
    // Removed h-screen, kept sticky top-0
    <aside className="w-80 md:w-96 flex-shrink-0 space-y-6 sticky top-0 p-4 md:p-0">

      {/* Card 1: Profile, Skills & CV */}
      <div className={`${cardClasses}`}>
        {/* Profile Section */}
        <div className="text-center border-b border-gray-100 pb-6 mb-6">
          <img
            src={personalInfo.profilePictureUrl}
            alt={personalInfo.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-gray-200"
          />
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{personalInfo.name}</h1>
          <p className="text-xs md:text-sm text-gray-500">{personalInfo.title} • {personalInfo.location}</p>
        </div>

        {/* Skills Section (within Card 1) */}
        <div className="mb-6">
           <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wider">Skills</h2>
           <div className="flex flex-wrap">
             {skills.map((skill) => (
               <SkillTag key={skill} skill={skill} />
             ))}
           </div>
        </div>

        {/* Download CV Button (within Card 1) */}
        <a
          href={personalInfo.cvUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center transition duration-150 ease-in-out"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span>Download CV</span>
        </a>
      </div>

      {/* Card 2: About Me & Contact */}
      <div className={cardClasses}>
        <h2 className="text-lg font-semibold text-blue-600 mb-3">About me</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {aboutMe}
        </p>
         <div className="pt-4 border-t border-gray-100">
           <a href={`mailto:${personalInfo.email}`} className="text-sm text-blue-600 hover:underline flex items-center">
             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
             {personalInfo.email}
           </a>
         </div>
      </div>

      {/* Card 3: Information */}
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