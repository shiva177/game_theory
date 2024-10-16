import React, { useState } from 'react';
import { updateBooking, deleteBooking } from '../utils/localStorageUtils';
import { toast } from 'react-toastify';

const BookingGrid = ({ selectedCenter, selectedSport, bookings, onBookingUpdated, onBookingDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const hours = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"];

  const handleEdit = (booking) => {
    setIsEditing(true);
    setEditingBooking(booking);
  };

  const handleUpdate = () => {
    if (!editingBooking) return;
    updateBooking(editingBooking);
    setIsEditing(false);
    onBookingUpdated(editingBooking); // Trigger update in parent
  };

  const handleDelete = (bookingId) => {
    deleteBooking(bookingId);
    onBookingDeleted(bookingId); // Trigger delete in parent
  };

  const isBeingEdited = (bookingId) => editingBooking && editingBooking.id === bookingId;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Schedule</h2>
      <div className="grid grid-cols-7 gap-2">
        {/* Header Row for Time Slots */}
        <div className="font-bold">Court</div>
        {hours.map((hour, index) => (
          <div key={index} className="text-center font-bold">{hour}</div>
        ))}

        {/* Rows for Courts */}
        {selectedSport.courts.map((court, courtIndex) => (
          <React.Fragment key={courtIndex}>
            {/* Court Label */}
            <div className="font-bold text-center">{`Court ${court}`}</div>

            {/* Time Slots for Each Court */}
            {hours.map((hour, index) => {
              const booking = bookings.find(b => b.startTime === hour && b.courtId === court);

              return (
                <div key={index} className="border border-gray-300 p-2 text-center">
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
