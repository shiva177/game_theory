import React, { useState, useEffect } from 'react';
import { saveBooking, updateBooking } from '../utils/localStorageUtils';
import { toast } from 'react-toastify';
import Button from './Button';

const BookingForm = ({ selectedCenter, selectedSport, availableCourts = [], onBookingCreated, editingBooking, onBookingUpdated, selectedDate }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingBooking) {
      setCustomerName(editingBooking.customerName);
      setSelectedCourt(editingBooking.courtId);
      setSelectedTime(editingBooking.startTime);
    }
  }, [editingBooking]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName || !selectedCourt || !selectedTime || !selectedDate) {
      setError('Please fill out all fields.');
      toast.error('Please fill out all fields.');
      return;
    }

    if (editingBooking) {
      const updatedBooking = {
        ...editingBooking,
        customerName,
        courtId: parseInt(selectedCourt),
        startTime: selectedTime,
        date: selectedDate
      };
      updateBooking(selectedCenter.id, selectedSport.id, selectedDate, updatedBooking);
      onBookingUpdated(updatedBooking);
      toast.success('Booking updated successfully!');
    } else {
      const allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
      const isSlotTaken = allBookings[selectedCenter.id]?.[selectedSport.id]?.[selectedDate]?.some(
        booking => booking.courtId === parseInt(selectedCourt) && booking.startTime === selectedTime
      );

      if (isSlotTaken) {
        setError('This court is already booked for the selected time.');
        toast.error('This court is already booked for the selected time.');
        return;
      }

      const newBooking = {
        id: Date.now(),
        centerId: selectedCenter.id,
        sportId: selectedSport.id,
        courtId: parseInt(selectedCourt),
        startTime: selectedTime,
        customerName,
        date: selectedDate
      };
      saveBooking(selectedCenter.id, selectedSport.id, selectedDate, newBooking);
      onBookingCreated(newBooking);
      toast.success('Booking created successfully!');
    }

    setCustomerName('');
    setSelectedCourt('');
    setSelectedTime('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <h2 className="text-2xl font-semibold text-black mb-6">
        {editingBooking ? 'Edit Booking' : 'Create Booking'}
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-2">
        <label className="block text-lg font-medium text-black/80">Customer Name</label>
        <input
          type="text"
          placeholder='Name'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="block w-full p-2 border border-gray-300 bg-white/80 backdrop-blur-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-lg font-medium text-black/80">Select Court</label>
        <select
          value={selectedCourt}
          onChange={(e) => setSelectedCourt(e.target.value)}
          className="block w-full p-2 border border-gray-300 bg-white/80 backdrop-blur-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">-- Choose a Court --</option>
          {availableCourts.map((court, index) => (
            <option key={index} value={court}>Court {court}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-lg font-medium text-black/80">Select Time</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="block w-full p-2 border border-gray-300 bg-white/80 backdrop-blur-lg rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">-- Choose a Time --</option>
          {["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"].map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={availableCourts.length === 0}
      >
        {editingBooking ? 'Save Changes' : 'Create Booking'}
      </Button>
    </form>
  );
};

export default BookingForm;
