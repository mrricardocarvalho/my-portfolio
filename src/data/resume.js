const resumeData = {
  experience: [
    {
      id: 1,
      logoUrl: "assets/company-logos/microsoft-logo.png", // Removed leading slash
      company: "Microsoft",
      location: "Sysmatch (Contractor at Microsoft)",
      title: "Dynamics Business Central Support Engineer EMEA",
      startDate: "Feb 2020",
      endDate: "2021",
      type: "Full-time",
      description: "Led the resolution of complex Dynamics 365 BC escalations for partners and customers across EMEA, consistently exceeding SLA targets. Executed in-depth technical analysis and troubleshooting across AL code, SQL performance, API integrations, and Azure dependencies. Acted as a trusted liaison between Microsoft teams and clients, accelerating resolution of business-critical issues. Advised partners and customers on best practices for configuration, customization, and upgrade planning in BC. Documented software issues with precision, influencing product improvements in future Business Central releases."
    },
    {
      id: 2,
      logoUrl: "assets/company-logos/sysmatchpt.png", // Ensure exists in public/assets/company-logos/
      company: "Sysmatch",
      location: "Lisbon, PT",
      title: "Senior Dynamics NAV Developer",
      startDate: "Nov 2018",
      endDate: "Feb 2020",
      type: "Full-time",
      description: "Designed and implemented tailored Dynamics NAV (C/AL) solutions for strategic healthcare clients across Portugal, Angola, and Mozambique. Engineered robust XML-based integrations between NAV and external platforms (LIMS, billing, logistics), ensuring secure and reliable data exchange. Assumed full technical ownership of NAV environments, managing system maintenance, performance tuning (SQL/C/AL), and critical support resolution. Optimized NAV deployment methodologies and established internal best practices, reducing implementation lead times and enhancing team efficiency."
    },
    {
      id: 3,
      logoUrl: "assets/company-logos/novabase.png", // CHANGE LOGO FILENAME HERE AND IN FOLDER
      company: "Novabase",
      location: "Lisbon, PT",
      title: "IT Consultant (Dynamics AX)",
      startDate: "Mar 2018",
      endDate: "Nov 2018",
      type: "Full-time",
      description: "Provided functional and technical support for Dynamics AX, resolving user issues and improving overall system efficiency. Contributed to solution design, requirement analysis, and user acceptance testing for Dynamics AX implementations. Leveraged Microsoft telemetry data to monitor performance and guide client-focused support strategies."
    },
    {
      id: 4,
      logoUrl: "assets/company-logos/aboutnav.png", // Ensure exists in public/assets/company-logos/
      company: "AboutNav",
      location: "Lisbon, PT",
      title: "Senior Dynamics NAV Developer",
      startDate: "Nov 2016",
      endDate: "Feb 2018",
      type: "Full-time",
      description: "Led full-cycle Dynamics NAV implementations, covering requirement analysis, C/AL development, data migration, and go-live support across multiple technical sectors. Developed advanced C/AL customizations and XML integrations, delivering tailored solutions aligned with specific client workflows. Provided ongoing NAV technical administration and support in an outsourced services environment, ensuring system stability and performance."
    }
    // Add any older experience here if desired
  ],
  education: [
     // Recommend adding most relevant / highest degree first if applicable
     {
      id: 6, // Changed ID to keep it unique
      logoUrl: "assets/company-logos/isg.png", // CHANGE LOGO FILENAME HERE AND IN FOLDER
      institution: "Instituto Superior de Gestão",
      location: "Lisboa, PT",
      degree: "Licenciatura in Management Informatics",
      startDate: "Sep 1998",
      endDate: "May 2004",
      description: "Graduate"
    },
    {
      id: 1,
      logoUrl: "assets/company-logos/formabase.png", // CHANGE LOGO FILENAME HERE AND IN FOLDER
      institution: "Formabase",
      location: "Lisbon, PT",
      degree: "Training: JavaScript",
      startDate: "Sep 2015",
      endDate: "Oct 2015",
      description: ""
    },
    {
      id: 2,
      logoUrl: "assets/company-logos/rumos.png", // CHANGE LOGO FILENAME HERE AND IN FOLDER
      institution: "Rumos",
      location: "Lisbon, PT",
      degree: "Training: Developing ASP.NET MVC 4 Web Apps",
      startDate: "Jun 2015",
      endDate: "Jun 2015",
      description: ""
    },
    {
      id: 3,
      logoUrl: "assets/company-logos/galileu.png", // CHANGE LOGO FILENAME HERE AND IN FOLDER
      institution: "Galileu",
      location: "Lisboa, PT",
      degree: "Training: Microsoft Visual Studio 2010 ASP.NET",
      startDate: "Dec 2012",
      endDate: "Dec 2012",
      description: ""
    },
    {
      id: 4,
      logoUrl: "assets/company-logos/galileu.png", // CHANGE LOGO FILENAME HERE AND IN FOLDER (can reuse)
      institution: "Galileu",
      location: "Lisboa, PT",
      degree: "Microsoft Dynamics NAV 2009 Installation & Configuration", // Shortened
      startDate: "Sep 2011",
      endDate: "Sep 2011",
      description: "(Exam MB7-838)" // Added exam code to description
    },
    {
      id: 5,
      logoUrl: "assets/company-logos/conhecermais.png", // CHANGE LOGO FILENAME HERE AND IN FOLDER
      institution: "Conhecer Mais TI RH e IEFP",
      location: "Lisboa, PT",
      degree: "Certified Technical Trainer (CCP)",
      startDate: "Apr 2008",
      endDate: "Apr 2008",
      description: ""
    },
  ]
};

export default resumeData;