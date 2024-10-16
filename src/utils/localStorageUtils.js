// Utility functions to manage bookings in local storage

// Get bookings from local storage
export function getBookings() {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
  }
  
  // Save bookings to local storage
  export function saveBooking(newBooking) {
    const bookings = getBookings();
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
  
  // Delete a booking from local storage
  export function deleteBooking(bookingId) {
    let bookings = getBookings();
    bookings = bookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
  