import React from 'react';
import { deleteBooking } from '../utils/localStorageUtils';
import { toast } from 'react-toastify';

const BookingGrid = ({ selectedCenter, selectedSport, bookings, onEditBooking, onBookingDeleted }) => {
  const hours = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"];

  const handleDelete = (bookingId) => {
    deleteBooking(selectedCenter.id, selectedSport.id, bookingId); // Delete specific to center and sport
    onBookingDeleted(bookingId); // Trigger delete in parent
    toast.success("Booking deleted successfully!");
  };

  return (
    <div className="mt-6">
      {/* Dynamic Heading to show center and sport */}
      <h2 className="text-xl font-semibold mb-4">
        Schedule of "{selectedSport.name}" at "{selectedCenter.name}"
      </h2>

      <div className="grid grid-cols-7 gap-4">
        <div></div> {/* Empty cell for time labels */}
        {hours.map((hour, index) => (
          <div key={index} className="text-center font-bold">{hour}</div>
        ))}

        {selectedSport.courts.map((court, courtIndex) => (
          <React.Fragment key={courtIndex}>
            <div className="font-bold text-center">Court {court}</div>

            {hours.map((hour, index) => {
              const booking = bookings.find(b => b.startTime === hour && b.courtId === court);

              return (
                <div key={index} className="border border-gray-300 p-2 text-center">
                  {booking ? (
                    <div className="bg-green-200 p-2 rounded">
                      <p>{booking.customerName}</p>
                      <button
                        className="text-blue-500"
                        onClick={() => onEditBooking(booking)} // Trigger edit in parent
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 ml-2"
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
    </div>
  );
};

export default BookingGrid;
