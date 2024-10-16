import React, { useState, useEffect } from 'react';
import CenterSelector from '../components/CenterSelector';
import BookingGrid from '../components/BookingGrid';
import BookingForm from '../components/BookingForm';
import { getAllBookings } from '../utils/localStorageUtils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const centersData = [
  {
    id: 1,
    name: "Indiranagar",
    location: "Bangalore",
    sports: [
      { id: 1, name: "Badminton", courts: [1, 2, 3, 4] },
      { id: 2, name: "Squash", courts: [1, 2, 3, 4, 5] }
    ]
  },
  {
    id: 2,
    name: "Koramangala",
    location: "Bangalore",
    sports: [
      { id: 3, name: "Tennis", courts: [1, 2, 3, 4, 5, 6] },
      { id: 4, name: "Basketball", courts: [1, 2] }
    ]
  }
];

function SchedulePage() {
  const [selectedCenter, setSelectedCenter] = useState(centersData[0]);
  const [selectedSport, setSelectedSport] = useState(centersData[0].sports[0]);
  const [allBookings, setAllBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    if (selectedCenter && selectedSport) {
      setAllBookings(getAllBookings(selectedCenter.id, selectedSport.id));
    }
  }, [selectedCenter, selectedSport]);

  const handleBookingCreated = (newBooking) => {
    setAllBookings(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newBooking]
    }));
  };

  const handleBookingUpdated = (updatedBooking) => {
    setAllBookings(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].map(booking =>
        booking.id === updatedBooking.id ? updatedBooking : booking
      )
    }));
    setEditingBooking(null);
  };

  const handleBookingDeleted = (bookingId) => {
    setAllBookings(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter(booking => booking.id !== bookingId)
    }));
  };

  return (
    <div className="container flex items-center h-screen mx-auto mb-60 lg:mb-0 mt-60 lg:mt-24 justify-center p-4">
      {/* Responsive grid: Form becomes full width on small screens */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar (BookingForm with Glassmorphism) */}
        <div className="lg:col-span-1 bg-white/40 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-gray-200">
          <BookingForm
            selectedCenter={selectedCenter}
            selectedSport={selectedSport}
            availableCourts={selectedSport.courts}
            onBookingCreated={handleBookingCreated}
            editingBooking={editingBooking}
            onBookingUpdated={handleBookingUpdated}
            selectedDate={selectedDate}
          />
        </div>

        {/* Main content (BookingGrid with dark theme) */}
        <div className="lg:col-span-3 bg-gray-900 border p-6 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
            <CenterSelector
              centers={centersData}
              onSelectCenter={setSelectedCenter}
              onSelectSport={setSelectedSport}
            />

            {/* Date picker */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto p-2 border border-gray-300 bg-gray-700 text-white rounded-md shadow-sm"
            />
          </div>

          {/* Booking grid */}
          <BookingGrid
            selectedCenter={selectedCenter}
            selectedSport={selectedSport}
            allBookings={allBookings}
            selectedDate={selectedDate}
            onEditBooking={setEditingBooking}
            onBookingDeleted={handleBookingDeleted}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SchedulePage;
