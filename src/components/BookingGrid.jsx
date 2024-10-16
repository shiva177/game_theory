import React, { useState } from 'react';
import { getBookings, deleteBooking, saveBooking } from '../utils/localStorageUtils';

const BookingGrid = ({ selectedCenter, selectedSport }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  
  const bookings = getBookings().filter(
    booking => booking.centerId === selectedCenter.id && booking.sportId === selectedSport.id
  );

  const hours = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"];

  const handleEdit = (booking) => {
    setIsEditing(true);
    setEditingBooking(booking);
  };

  const handleUpdate = () => {
    if (!editingBooking) return;
    deleteBooking(editingBooking.id); // Remove the old booking
    saveBooking(editingBooking);      // Save the updated booking
    setIsEditing(false);
    window.location.reload();          // Reload to reflect changes
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Schedule</h2>
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
                        onClick={() => handleEdit(booking)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => {
                          deleteBooking(booking.id);
                          window.location.reload(); // Reload to update bookings
                        }}
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
