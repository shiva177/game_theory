// Utility functions to manage bookings in local storage

// Get bookings from local storage
export function getBookings() {
    try {
      const bookings = localStorage.getItem('bookings');
      return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
      console.error("Error fetching bookings from localStorage", error);
      return [];
    }
  }
  
  // Save bookings to local storage
  export function saveBooking(newBooking) {
    const bookings = getBookings();
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
  
  // Update an existing booking in local storage
  export function updateBooking(updatedBooking) {
    let bookings = getBookings();
    bookings = bookings.map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
  
  // Delete a booking from local storage
  export function deleteBooking(bookingId) {
    let bookings = getBookings();
    bookings = bookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
  