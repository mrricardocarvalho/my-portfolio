import React from 'react';

function ExperienceCard({ item }) {
  return (
    // This top div is now the light gray card itself. Added flex and alignment.
    <div className="bg-gray-50 hover:bg-gray-100 p-6 rounded-lg transition duration-150 ease-in-out flex items-start space-x-6">

      {/* Logo Inside */}
      <div className="flex-shrink-0"> {/* No margin needed here, using space-x on parent */}
        <img
            src={item.logoUrl}
            alt={`${item.company} logo`}
            // Adjusted size slightly, check if w-12 h-12 or w-10 h-10 looks better
            className="w-10 h-10 rounded-full border border-gray-200 object-contain"
            onError={(e) => { e.target.style.backgroundColor = '#e5e7eb'; }}
        />
      </div>

      {/* Details Section (no separate background needed) */}
      <div className="flex-grow"> {/* Removed bg, padding, rounding from here */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">
              {item.company} • {item.location}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
             <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                {item.type}
             </span>
             <p className="text-xs text-gray-500 mt-1">{`${item.startDate} - ${item.endDate}`}</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          {item.description}
        </p>
      </div>

    </div> // End of the gray card div
  );
}

export default ExperienceCard;