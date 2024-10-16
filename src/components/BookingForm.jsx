import React, { useState, useEffect } from 'react';
import { saveBooking, updateBooking } from '../utils/localStorageUtils';
import { toast } from 'react-toastify';

const BookingForm = ({ selectedCenter, selectedSport, availableCourts = [], onBookingCreated, editingBooking, onBookingUpdated }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  // Populate form if editing an existing booking
  useEffect(() => {
    if (editingBooking) {
      setCustomerName(editingBooking.customerName);
      setSelectedCourt(editingBooking.courtId);
      setSelectedTime(editingBooking.startTime);
    }
  }, [editingBooking]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (!customerName || !selectedCourt || !selectedTime) {
      setError('Please fill out all fields.');
      toast.error('Please fill out all fields.');
      return;
    }

    if (editingBooking) {
      // Update existing booking
      const updatedBooking = {
        ...editingBooking,
        customerName,
        courtId: parseInt(selectedCourt),
        startTime: selectedTime,
      };
      updateBooking(selectedCenter.id, selectedSport.id, updatedBooking);
      onBookingUpdated(updatedBooking);
      toast.success('Booking updated successfully!');
    } else {
      // Check for double booking
      const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
      const isSlotTaken = bookings[selectedCenter.id]?.[selectedSport.id]?.some(
        booking => booking.courtId === parseInt(selectedCourt) && booking.startTime === selectedTime
      );

      if (isSlotTaken) {
        setError('This court is already booked for the selected time.');
        toast.error('This court is already booked for the selected time.');
        return;
      }

      // Create new booking
      const newBooking = {
        id: Date.now(),
        centerId: selectedCenter.id,
        sportId: selectedSport.id,
        courtId: parseInt(selectedCourt),
        startTime: selectedTime,
        customerName
      };
      saveBooking(selectedCenter.id, selectedSport.id, newBooking); // Save the booking specific to the center and sport
      onBookingCreated(newBooking); // Trigger after successful creation
      toast.success('Booking created successfully!');
    }

    // Clear form fields after booking is created or updated
    setCustomerName('');
    setSelectedCourt('');
    setSelectedTime('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingBooking ? 'Edit Booking' : 'Create Booking'}
      </h2>

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
              <option key={index} value={court}>Court {court}</option>
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
        className={`px-4 py-2 ${availableCourts.length === 0 ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
        disabled={availableCourts.length === 0}
      >
        {editingBooking ? 'Save Changes' : 'Create Booking'}
      </button>
    </form>
  );
};

export default BookingForm;
