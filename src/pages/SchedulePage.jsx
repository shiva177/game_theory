import React, { useState, useEffect } from 'react';
import CenterSelector from '../components/CenterSelector';
import BookingGrid from '../components/BookingGrid';
import BookingForm from '../components/BookingForm';
import { getBookings } from '../utils/localStorageUtils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [bookings, setBookings] = useState(getBookings(selectedCenter.id, selectedSport.id));
  const [editingBooking, setEditingBooking] = useState(null); // Add state for editing

  useEffect(() => {
    setBookings(getBookings(selectedCenter.id, selectedSport.id));
  }, [selectedCenter, selectedSport]);

  const handleBookingCreated = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  const handleBookingUpdated = (updatedBooking) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    setBookings(updatedBookings);
    setEditingBooking(null); // Clear editing state
  };

  const handleBookingDeleted = (bookingId) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
  };

  return (
    <div>
      <main className="container mx-auto mt-40 p-4">
        <CenterSelector
          centers={centersData}
          onSelectCenter={setSelectedCenter}
          onSelectSport={setSelectedSport}
        />

        {selectedCenter && selectedSport && (
          <>
            <BookingForm
              selectedCenter={selectedCenter}
              selectedSport={selectedSport}
              availableCourts={selectedSport.courts}
              onBookingCreated={handleBookingCreated}
              editingBooking={editingBooking} // Pass editing booking
              onBookingUpdated={handleBookingUpdated} // Handle booking update
            />
            <BookingGrid
              selectedCenter={selectedCenter}
              selectedSport={selectedSport}
              bookings={bookings}
              onEditBooking={setEditingBooking} // Set booking for edit
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
