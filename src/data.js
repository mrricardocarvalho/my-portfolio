// src/data.js

const professionalData = {
  personalInfo: {
    name: "Ricardo Carvalho", // Replace with Your Name
    title: "Senior D365 BC Developer", // Replace with Your Title
    location: "PT", // Replace with Your Base Location
    profilePictureUrl: "/assets/profile.png", // Placeholder path - Create /public/assets/profile.jpg later
    email: "ricardo.sampaio@gmail.com", // Replace with Your Email
    // Optional: Add portfolioUrl, linkedInUrl, githubUrl etc.
    cvUrl: "/assets/your-cv.pdf" // Placeholder path - Create /public/assets/your-cv.pdf later
  },
  aboutMe: `Experienced Dynamics 365 Business Central Developer with over 15 years of success delivering high-impact ERP solutions across the EMEA region. Expert in custom development, complex integrations (API/XML/JSON), performance optimization, and advanced technical support. Known for leading development initiatives, resolving complex technical challenges, and driving successful project outcomes that exceed client expectations.`, // Replace with Your About Me text
  skills: ["JavaScript", "React", "Node.js", "ExpressJS", "Python", "SQL", "Git", "Agile", "CI/CD"], // Replace with Your Skills
  information: {
    location: "Portugal", // Replace with Your Current Location
    experience: ">15 years", // Replace with Your Years of Experience
    availability: "In 2 month", // Replace with Your Availability
    relocation: "No" // Replace with Your Relocation Preference (Yes/No)
  },
  experience: [
    {
      id: 1,
      logoUrl: "/assets/company-logos/microsoft-logo.png", // Placeholder path
      company: "Microsoft",
      location: "Sysmatch (Contractor at Microsoft)",
      title: "Dynamics Business Central Support Engineer EMEA",
      startDate: "Feb 2020",
      endDate: "2021",
      type: "Full-time",
      description: "Led the resolution of complex Dynamics 365 BC escalations for partners and customers across EMEA, consistently exceeding SLA targets. Executed in-depth technical analysis and troubleshooting across AL code, SQL performance, API integrations, and Azure dependencies. Acted as a trusted liaison between Microsoft teams and clients, accelerating resolution of business-critical issues. Advised partners and customers on best practices for configuration, customization, and upgrade planning in BC. Documented software issues with precision, influencing product improvements in future Business Central releases." // Replace
    },
    {
      id: 2,
      logoUrl: "/assets/company-logos/sysmatchpt.png", // Placeholder path
      company: "Sysmatch",
      location: "Lisbon, PT",
      title: "Senior Dynamics NAV Developer",
      startDate: "Nov 2018",
      endDate: "Feb 2020",
      type: "Full-time", // Corrected type
      description: "Designed and implemented tailored Dynamics NAV (C/AL) solutions for strategic healthcare clients across Portugal, Angola, and Mozambique. Engineered robust XML-based integrations between NAV and external platforms (LIMS, billing, logistics), ensuring secure and reliable data exchange. Assumed full technical ownership of NAV environments, managing system maintenance, performance tuning (SQL/C/AL), and critical support resolution. Optimized NAV deployment methodologies and established internal best practices, reducing implementation lead times and enhancing team efficiency." // Replace
    },
    {
      id: 3,
      logoUrl: "/assets/company-logos/sysmatchpt.png", // Placeholder path
      company: "Novabase",
      location: "Lisbon, PT",
      title: "IT Consultant (Dynamics AX)",
      startDate: "Mar 2018",
      endDate: "Nov 2018",
      type: "Full-time", // Example type, adjust as needed
      description: "Provided functional and technical support for Dynamics AX, resolving user issues and improving overall system efficiency. Contributed to solution design, requirement analysis, and user acceptance testing for Dynamics AX implementations. Leveraged Microsoft telemetry data to monitor performance and guide client-focused support strategies." // Replace
    },
    {
      id: 4,
      logoUrl: "/assets/company-logos/aboutnav.png", // Placeholder path
      company: "AboutNav",
      location: "Lisbon, PT",
      title: "Senior Dynamics NAV Developer",
      startDate: "Nov 2016",
      endDate: "Feb 2018",
      type: "Full-time", // Corrected type
      description: "Led full-cycle Dynamics NAV implementations, covering requirement analysis, C/AL development, data migration, and go-live support across multiple technical sectors. Developed advanced C/AL customizations and XML integrations, delivering tailored solutions aligned with specific client workflows. Provided ongoing NAV technical administration and support in an outsourced services environment, ensuring system stability and performance." // Replace
    }
  ],
  education: [
    {
      id: 1,
      logoUrl: "/assets/company-logos/berkeley.png", // Placeholder path
      institution: "Formabase", // Corrected Name
      location: "Lisbon, PT",
      degree: "Training: JavaScript",
      startDate: "Sep 2015",
      endDate: "Oct 2015",
      description: "" // Replace
    },    
    {
      id: 2,
      logoUrl: "/assets/company-logos/stanford.png", // Placeholder path
      institution: "Rumos",
      location: "Lisbon, PT",
      degree: "Training: Developing ASP.NET MVC 4 Web Apps",
      startDate: "Jun 2015",
      endDate: "Jun 2015",
      description: "" // Replace
    },
    {
      id: 3,
      logoUrl: "/assets/company-logos/deanza.png", // Placeholder path
      institution: "Galileu",
      location: "Lisboa, PT",
      degree: "Training: Microsoft Visual Studio 2010 ASP.NET",
      startDate: "Dec 2012",
      endDate: "Dec 2012",
      description: "" // Replace
    },
    {
      id: 4,
      logoUrl: "/assets/company-logos/deanza.png", // Placeholder path
      institution: "Galileu",
      location: "Lisboa, PT",
      degree: "Microsoft Dynamics NAV 2009 Installation & Configuration (MB7-838)",
      startDate: "Sep 2011",
      endDate: "Sep 2011",
      description: "" // Replace
    },
    {
      id: 5,
      logoUrl: "/assets/company-logos/deanza.png", // Placeholder path
      institution: "Conhecer Mais TI RH e IEFP",
      location: "Lisboa, PT",
      degree: "Certified Technical Trainer (CCP)",
      startDate: "Apr 2008",
      endDate: "Apr 2008",
      description: "" // Replace
    },    
    {
      id: 6,
      logoUrl: "/assets/company-logos/deanza.png", // Placeholder path
      institution: "Instituto Superior de Gestão",
      location: "Lisboa, PT",
      degree: "Licenciatura in Management Informatics",
      startDate: "Sep 1998",
      endDate: "May 2004",
      description: "Graduate" // Replace
    }
  ],
  projects: [
    {
      id: 'proj-1',
      iconUrl: "/assets/project-icons/codecraft.svg", // Placeholder path - use generic or specific icons
      title: "Professional Portfolio",
      category: "Web Developer Tools",
      role: "Founder",
      date: "May 2025",
      description: "A professional portfolio showcasing my skills and projects. Built with React, Node.js, and ExpressJS.",
      url: "https://codecraft-placeholder.net" // Replace with actual URL
    },
    // Add more project objects here
  ],
  blog: [
    {
      id: 'blog-1',
      date: "February 22, 2024",
      title: "Building an Online Presence as a Full Stack Developer",
      excerpt: "Explore the importance of establishing a strong online presence for full stack developers. Learn how to create a compelling portfolio, engage with the developer community, and leverage social media to boost your career.",
      slug: "building-online-presence-full-stack" // Used for link URL
    },
    {
      id: 'blog-2',
      date: "February 15, 2024",
      title: "Navigating the Full Stack Developer Job Interview Maze",
      excerpt: "Prepare for success in your full stack developer job interviews. Uncover common interview questions, tips for showcasing your problem-solving skills, and strategies for handling technical assessments.",
      slug: "navigating-full-stack-interview-maze" // Used for link URL
    },
    {
      id: 'blog-3',
      date: "February 8, 2024",
      title: "Mastering the Art of Full Stack Developer Cover Letters",
      excerpt: "Explore the art of writing compelling cover letters for full stack developer positions. Learn how to tailor your cover letter to showcase your technical prowess and demonstrate your passion for coding.",
      slug: "mastering-full-stack-cover-letters" // Used for link URL
    }
    // Add more blog post objects here
  ],
};

export default professionalData;