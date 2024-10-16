import React from 'react';
import { deleteBooking } from '../utils/localStorageUtils';
import { toast } from 'react-toastify';
import { Edit, Edit2Icon, Edit3, Trash2Icon } from 'lucide-react';

const BookingGrid = ({ selectedCenter, selectedSport, allBookings, selectedDate, onEditBooking, onBookingDeleted }) => {
  const hours = ["4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM"];

  const bookingsForSelectedDate = allBookings[selectedDate] || [];

  const handleDelete = (bookingId) => {
    deleteBooking(selectedCenter.id, selectedSport.id, selectedDate, bookingId);
    onBookingDeleted(bookingId);
    toast.success("Booking deleted successfully!");
  };

  return (
    <div > 
    

      {/* Make grid scrollable horizontally for smaller screens */}
      <div className="overflow-x-auto">
        <div className="min-w-max grid grid-cols-7 gap-4 lg:grid-cols-7 sm:grid-cols-1">
          {/* Empty top-left corner cell */}
          <div></div>
          {/* Time Labels */}
          {hours.map((hour, index) => (
            <div key={index} className="text-center font-bold text-gray-400 lg:text-lg sm:text-sm">{hour}</div>
          ))}

          {/* Court and Booking Rows */}
          {selectedSport.courts.map((court, courtIndex) => (
            <React.Fragment key={courtIndex}>
              {/* Court Label */}
              <div className="font-bold text-center text-gray-400 lg:text-lg sm:text-sm">Court {court}</div>

              {/* Booking Grid */}
              {hours.map((hour, index) => {
                const booking = bookingsForSelectedDate.find(b => b.startTime === hour && b.courtId === court);

                return (
                  <div key={index} className="border border-gray-600 p-4 text-center bg-gray-800 rounded-lg shadow-md">
                    {booking ? (
                      <div className="bg-green-400 p-2 rounded-md">
                        <p className="font-semibold text-black lg:text-base sm:text-sm">{booking.customerName}</p>
                        <button
                          className="text-blue-900 rounded-full hover:underline p-2 lg:text-xs sm:text-sm"
                          onClick={() => onEditBooking(booking)}
                        >
                          <Edit/>
                        </button>
                        <button
                          className=" rounded-full ml-2 text-red-700 hover:underline lg:text-xs p-2 sm:text-sm"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <Trash2Icon/>
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400 lg:text-base sm:text-sm">Available</p>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold  text-center mt-8  text-white mb-6">
        Schedule of <span className='underline'>{selectedSport.name}</span> at <span className='underline'>{selectedCenter.name}</span> on <span className='underline'>{selectedDate}</span>
      </h2>
    </div>
  );
};

export default BookingGrid;
