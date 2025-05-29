import React from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '../data/projects'; // Import project data directly

// Reuse the card styling definition
const sectionCardClasses = "bg-white rounded-lg shadow";

function ProjectsSection() {
  const projects = projectsData.projects; // Get projects from imported data

  return (
    <section className="mt-8" aria-label="Projects">
       {/* Main container card */}
       <div className={sectionCardClasses}>
          {/* Title inside the card */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-0 flex items-center p-6 border-b border-gray-200">
             <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
             Projects
          </h2>

          {/* List of Project Cards */}
          <div>
             {projects && projects.length > 0 ? (
               projects.map((project) => (
                 <article key={project.id} aria-labelledby={`project-title-${project.id}`}>
                   <ProjectCard project={project} />
                 </article>
               ))
             ) : (
               <p className="p-6 text-gray-500">No projects listed yet.</p>
             )}
          </div>
       </div>
    </section>
  );
}

export default ProjectsSection;