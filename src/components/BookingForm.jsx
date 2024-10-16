import React, { useState } from 'react';
import { saveBooking, getBookings } from '../utils/localStorageUtils';

const BookingForm = ({ selectedCenter, selectedSport, availableCourts = [], onBookingCreated }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  // Ensure bookings for the selected center and sport are retrieved
  const bookings = getBookings().filter(
    booking => booking.centerId === selectedCenter?.id && booking.sportId === selectedSport?.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (!customerName || !selectedCourt || !selectedTime) {
      setError('Please fill out all fields.');
      return;
    }

    // Check for double booking
    const isSlotTaken = bookings.some(
      booking => booking.courtId === parseInt(selectedCourt) && booking.startTime === selectedTime
    );

    if (isSlotTaken) {
      setError('This court is already booked for the selected time.');
      return;
    }

    const newBooking = {
      id: Date.now(),
      centerId: selectedCenter.id,
      sportId: selectedSport.id,
      courtId: parseInt(selectedCourt),
      startTime: selectedTime,
      customerName: customerName
    };

    saveBooking(newBooking);
    onBookingCreated(newBooking); // Pass the new booking to the parent component

    // Clear form fields after booking is created
    setCustomerName('');
    setSelectedCourt('');
    setSelectedTime('');
    setError('');
    alert('Booking created successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Create Booking</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Court</label>
        <select
          value={selectedCourt}
          onChange={(e) => setSelectedCourt(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
          required
        >
          <option value="">-- Choose a Court --</option>
          {availableCourts.length > 0 ? (
            availableCourts.map((court, index) => (
              <option key={index} value={court}>{`Court ${court}`}</option>
            ))
          ) : (
            <option disabled>No courts available</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Time</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm"
          required
        >
          <option value="">-- Choose a Time --</option>
          {["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"].map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Booking
      </button>
    </form>
  );
};

export default BookingForm;
