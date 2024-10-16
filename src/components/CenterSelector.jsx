import React, { useState } from 'react';

const CenterSelector = ({ centers, onSelectCenter, onSelectSport }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);

  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    const center = centers.find(c => c.id === parseInt(centerId));
    setSelectedCenter(center);
    setSelectedSport(null); // Reset sport selection when center changes
    onSelectCenter(center);
  };

  const handleSportChange = (e) => {
    if (!selectedCenter) return;
    const sportId = e.target.value;
    const sport = selectedCenter.sports.find(s => s.id === parseInt(sportId));
    setSelectedSport(sport);
    onSelectSport(sport);
  };

  return (
    <div className="my-4">
      <label className="block text-sm font-medium text-gray-200">Select Center</label>
      <select onChange={handleCenterChange} className="mt-1 block w-full p-2 border border-gray-300 bg-gray-600 rounded-md shadow-sm">
        <option value="">-- Choose a Center --</option>
        {centers.map(center => (
          <option key={center.id} value={center.id}>{center.name} - {center.location}</option>
        ))}
      </select>

      {selectedCenter && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-200">Select Sport</label>
          <select
            onChange={handleSportChange}
            className="mt-1 block w-full p-2 border border-gray-300 bg-gray-600 rounded-md shadow-sm"
            disabled={!selectedCenter} // Disable dropdown if no center is selected
          >
            <option value="">-- Choose a Sport --</option>
            {selectedCenter.sports.map(sport => (
              <option key={sport.id} value={sport.id}>{sport.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CenterSelector;
