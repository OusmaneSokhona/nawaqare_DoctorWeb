import React, { useState } from "react";

export default function CoverageArea() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Brazil",
    "Canada",
    "China",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Italy",
    "Japan",
    "Jordan",
    "Kenya",
    "Malaysia",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "UAE",
    "United Kingdom",
    "United States",
    "Vietnam",
  ];

  const regions = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Asia",
    "Middle East",
    "Oceania",
    "Central America",
    "Caribbean",
    "Southeast Asia",
    "East Asia",
    "South Asia",
    "Central Asia",
    "Western Europe",
    "Eastern Europe",
    "Northern Europe",
    "Southern Europe",
  ];

  return (
    <div className="">
      <div className=" bg-white rounded-lg  p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Coverage Area
        </h2>
        <div className="shadow-[0_0_10px_rgba(0,0,0,0.15)] p-6 rounded-xl">
          {/* Cities Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Cities
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              >
                <option value="" disabled>
                  xyz
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Regions Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Regions
            </label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              >
                <option value="" disabled>
                  USA
                </option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Display Selected Values */}
        {/* {(selectedCity || selectedRegion) && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected:</h3>
            {selectedCity && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">City/Country:</span> {selectedCity}
              </p>
            )}
            {selectedRegion && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Region:</span> {selectedRegion}
              </p>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
}
