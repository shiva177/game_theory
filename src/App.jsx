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
    sports: [
      { id: 1, name: "Badminton", courts: [1, 2] },
      { id: 2, name: "Squash", courts: [3] }
    ]
  },
  {
    id: 2,
    name: "Koramangala",
    sports: [
      { id: 3, name: "Tennis", courts: [4, 5] }
    ]
  }
];

function App() {
  const [selectedCenter, setSelectedCenter] = useState(centersData[0]); // Show first center by default
  const [selectedSport, setSelectedSport] = useState(centersData[0].sports[0]); // Show first sport by default
  const [bookings, setBookings] = useState(getBookings());

  useEffect(() => {
    setBookings(getBookings());
  }, [selectedCenter, selectedSport]); // Refresh bookings when center/sport changes

  const handleBookingCreated = (newBooking) => {
    setBookings([...bookings, newBooking]);
    toast.success('Booking created successfully!');
  };

  const handleBookingUpdated = (updatedBookings) => {
    setBookings(updatedBookings);
  };

  return (
    <ErrorBoundary>
      <div>
        <Navbar />
        <main className="container mx-auto p-4">
          <CenterSelector
            centers={centersData}
            onSelectCenter={setSelectedCenter}
            onSelectSport={setSelectedSport}
          />

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
          />

          <ToastContainer />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
