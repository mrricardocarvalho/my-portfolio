import React from 'react';

// Inline SVG icons (replace with library if preferred)
const CategoryIcon = () => <svg className="w-3.5 h-3.5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>;
const RoleIcon = () => <svg className="w-3.5 h-3.5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
const DateIcon = () => <svg className="w-3.5 h-3.5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const LinkIcon = () => <svg className="w-3.5 h-3.5 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>;


function ProjectCard({ project }) {
  return (
    // Outer container is now the gray card + hover effect
    // Removed border-b, added rounding, added transition
    <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition duration-150 ease-in-out flex items-start space-x-6 m-4 md:m-6"> {/* Add margin around each project card */}

      {/* Icon */}
      <div className="flex-shrink-0 mt-1">
        <img
          src={project.iconUrl}
          alt={`${project.title} icon`}
          className="w-10 h-10 rounded-full object-contain border border-gray-200 p-1"
          onError={(e) => { e.target.style.backgroundColor = '#f3f4f6'; }}
        />
      </div>

      {/* Details */}
      <div className="flex-grow">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.title}</h3>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center text-xs text-gray-500 mb-3 space-x-4">
          <span className="inline-flex items-center"><CategoryIcon /> {project.category}</span>
          <span className="inline-flex items-center"><RoleIcon /> {project.role}</span>
          <span className="inline-flex items-center"><DateIcon /> {project.date}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Link */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            <LinkIcon />
            {project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </a>
        )}
      </div>
    </div> // End of gray card div
  );
}

export default ProjectCard;