import React, { useEffect, useState } from 'react';
import { getBookings, deleteBooking, updateBooking } from '../utils/localStorageUtils';
import { toast } from 'react-toastify';

const BookingGrid = ({ selectedCenter, selectedSport, bookings }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [message, setMessage] = useState('');

  const hours = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"];

  const handleEdit = (booking) => {
    setIsEditing(true);
    setEditingBooking(booking);
  };

  const handleUpdate = () => {
    if (!editingBooking) return;
    updateBooking(editingBooking);
    setIsEditing(false);
    toast.success('Booking updated successfully!');
  };

  const handleDelete = (bookingId) => {
    deleteBooking(bookingId);
    toast.success('Booking deleted successfully!');
  };

  const isBeingEdited = (bookingId) => editingBooking && editingBooking.id === bookingId;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Schedule</h2>
      {message && <div className="text-green-500 mb-4">{message}</div>}
      <div className="grid grid-cols-7 gap-4">
        <div></div> {/* Empty cell for time labels */}
        {Array(6).fill().map((_, i) => <div key={i} className="text-center font-bold">Court {i + 1}</div>)}

        {hours.map((hour, index) => (
          <React.Fragment key={index}>
            <div className="text-right pr-4">{hour}</div> {/* Time Label */}
            {Array(6).fill().map((_, courtIndex) => {
              const booking = bookings.find(b => b.startTime === hour && b.courtId === courtIndex + 1);

              return (
                <div key={courtIndex} className="border border-gray-300 p-2">
                  {booking ? (
                    <div className="bg-green-200 p-2 rounded">
                      <p>{booking.customerName}</p>
                      <button
                        className="text-blue-500"
                        disabled={isBeingEdited(booking.id)}
                        onClick={() => handleEdit(booking)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 ml-2"
                        disabled={isBeingEdited(booking.id)}
                        onClick={() => handleDelete(booking.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p>Available</p>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold">Edit Booking</h3>
          <div className="my-2">
            <label>Customer Name: </label>
            <input
              type="text"
              value={editingBooking.customerName}
              onChange={(e) => setEditingBooking({...editingBooking, customerName: e.target.value})}
              className="border p-1"
            />
          </div>
          <div className="my-2">
            <label>Select Time: </label>
            <select
              value={editingBooking.startTime}
              onChange={(e) => setEditingBooking({...editingBooking, startTime: e.target.value})}
              className="border p-1"
            >
              {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
            </select>
          </div>
          <div className="my-2">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="ml-2 bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingGrid;
