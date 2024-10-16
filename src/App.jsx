import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CenterSelector from './components/CenterSelector';
import BookingGrid from './components/BookingGrid';
import BookingForm from './components/BookingForm';
import { getBookings } from './utils/localStorageUtils';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer, toast } from 'react-toastify';
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

function App() {
  // Default to the first center and sport
  const [selectedCenter, setSelectedCenter] = useState(centersData[0]);
  const [selectedSport, setSelectedSport] = useState(centersData[0].sports[0]);
  const [bookings, setBookings] = useState(getBookings(selectedCenter.id, selectedSport.id));

  useEffect(() => {
    setBookings(getBookings(selectedCenter.id, selectedSport.id));
  }, [selectedCenter, selectedSport]); // Refresh bookings when center or sport changes

  const handleBookingCreated = (newBooking) => {
    setBookings([...bookings, newBooking]);
    toast.success('Booking created successfully!');
  };

  const handleBookingUpdated = (updatedBooking) => {
    const updatedBookings = bookings.map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    setBookings(updatedBookings);
    toast.success('Booking updated successfully!');
  };

  const handleBookingDeleted = (bookingId) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    toast.success('Booking deleted successfully!');
  };

  return (
    <ErrorBoundary>
      <div>
        <Navbar />
        <main className="container mx-auto p-4">
          {/* Center and Sport Selection */}
          <CenterSelector
            centers={centersData}
            onSelectCenter={setSelectedCenter}
            onSelectSport={setSelectedSport}
          />

          {/* Show the Booking Form and Grid only after both center and sport are selected */}
          {selectedCenter && selectedSport && (
            <>
              <BookingForm
                selectedCenter={selectedCenter}
                selectedSport={selectedSport}
                availableCourts={selectedSport.courts}
                onBookingCreated={handleBookingCreated}
              />
              <BookingGrid
                selectedCenter={selectedCenter}
                selectedSport={selectedSport}
                bookings={bookings}
                onBookingUpdated={handleBookingUpdated}
                onBookingDeleted={handleBookingDeleted}
              />
            </>
          )}

          <ToastContainer />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
