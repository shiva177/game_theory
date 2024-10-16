import React, { useState } from 'react';

const CenterSelector = ({ centers, onSelectCenter, onSelectSport }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);

  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    const center = centers.find(c => c.id === parseInt(centerId));
    setSelectedCenter(center);
    onSelectCenter(center);
  };

  const handleSportChange = (e) => {
    const sportId = e.target.value;
    const sport = selectedCenter.sports.find(s => s.id === parseInt(sportId));
    setSelectedSport(sport);
    onSelectSport(sport);
  };

  return (
    <div className="my-4">
      <label className="block text-sm font-medium text-gray-700">Select Center</label>
      <select onChange={handleCenterChange} className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm">
        <option value="">-- Choose a Center --</option>
        {centers.map(center => (
          <option key={center.id} value={center.id}>{center.name}</option>
        ))}
      </select>

      {selectedCenter && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Select Sport</label>
          <select onChange={handleSportChange} className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm">
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
