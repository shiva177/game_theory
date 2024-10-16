import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CenterSelector from './components/CenterSelector';
import BookingGrid from './components/BookingGrid';
import BookingForm from './components/BookingForm';
import { getBookings } from './utils/localStorageUtils';
import ErrorBoundary from './components/ErrorBoundary';

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


  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [bookings, setBookings] = useState(getBookings());

  const handleBookingCreated = (newBooking) => {
    setBookings([...bookings, newBooking]);
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
            />
          </>
        )}
      </main>
    </div>
    </ErrorBoundary>
  );
}

export default App;
