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
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits for month
  const day = String(today.getDate()).padStart(2, '0'); // Ensure 2 digits for day
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
  // Default to the first center and first sport from centersData
  const [selectedCenter, setSelectedCenter] = useState(centersData[0]); // Default center
  const [selectedSport, setSelectedSport] = useState(centersData[0].sports[0]); // Default sport
  const [allBookings, setAllBookings] = useState({});
  const [selectedDate, setSelectedDate] = useState(getTodayDate()); // Default to today's date
  const [editingBooking, setEditingBooking] = useState(null);

  // Fetch all bookings for the default center and sport on component mount
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
    <div>
      <main className="container mx-auto mt-40 p-4">
        <CenterSelector
          centers={centersData}
          onSelectCenter={setSelectedCenter}
          onSelectSport={setSelectedSport}
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mt-4 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
          placeholder="Select Date"
        />

        {selectedCenter && selectedSport && selectedDate && (
          <>
            <BookingForm
              selectedCenter={selectedCenter}
              selectedSport={selectedSport}
              availableCourts={selectedSport.courts}
              onBookingCreated={handleBookingCreated}
              editingBooking={editingBooking}
              onBookingUpdated={handleBookingUpdated}
              selectedDate={selectedDate} // Pass the selected date
            />
            <BookingGrid
              selectedCenter={selectedCenter}
              selectedSport={selectedSport}
              allBookings={allBookings} // Pass all bookings
              selectedDate={selectedDate} // Pass the selected date for filtering
              onEditBooking={setEditingBooking}
              onBookingDeleted={handleBookingDeleted}
            />
          </>
        )}
        <ToastContainer />
      </main>
    </div>
  );
}

export default SchedulePage;
