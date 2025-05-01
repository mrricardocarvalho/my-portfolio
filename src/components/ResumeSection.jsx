import React from 'react';
import ExperienceCard from './ExperienceCard';
import EducationCard from './EducationCard';

// Define card styling for the main section container
const sectionCardClasses = "bg-white p-6 rounded-lg shadow";

function ResumeSection({ experience, education }) {
  return (
    // space-y-12 handles gap BETWEEN Experience and Education sections
    <div className="space-y-12">

      {/* --- Experience Section --- */}
      {/* Removed mt-8 from section, spacing now handled by outer structure or inherent margins */}
      <section>
        {/* This div IS the white container card */}
        <div className={sectionCardClasses}>
          {/* Title is now inside the white card */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
            Experience
          </h2>
          {/* Container for the list of gray cards */}
          <div className="relative space-y-8"> {/* space-y adds gap BETWEEN items inside */}
             {experience.map((item) => (
               <ExperienceCard key={item.id} item={item} />
             ))}
          </div>
        </div>
      </section>

      {/* --- Education Section --- */}
      {/* No mt-8 needed here, space-y-12 handles gap above */}
      <section>
         {/* This div IS the white container card */}
         <div className={sectionCardClasses}>
           {/* Title is now inside the white card */}
           <h2 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center">
             <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
             Education
           </h2>
           {/* Container for the list of gray cards */}
           <div className="relative space-y-8"> {/* space-y adds gap BETWEEN items inside */}
               {education.map((item) => (
                 <EducationCard key={item.id} item={item} />
               ))}
           </div>
         </div>
      </section>
    </div>
  );
}

export default ResumeSection;