// Utility functions to manage bookings in local storage

// Get bookings from local storage based on center and sport
export function getBookings(centerId, sportId) {
  const allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
  return allBookings[centerId]?.[sportId] || [];
}

// Save bookings to local storage based on center and sport
export function saveBooking(centerId, sportId, newBooking) {
  let allBookings = JSON.parse(localStorage.getItem('bookings')) || {};

  if (!allBookings[centerId]) {
    allBookings[centerId] = {};
  }
  if (!allBookings[centerId][sportId]) {
    allBookings[centerId][sportId] = [];
  }

  allBookings[centerId][sportId].push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(allBookings));
}

// Update a booking in local storage
export function updateBooking(centerId, sportId, updatedBooking) {
  let allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
  if (allBookings[centerId] && allBookings[centerId][sportId]) {
    allBookings[centerId][sportId] = allBookings[centerId][sportId].map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    localStorage.setItem('bookings', JSON.stringify(allBookings));
  }
}

// Delete a booking from local storage
export function deleteBooking(centerId, sportId, bookingId) {
  let allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
  if (allBookings[centerId] && allBookings[centerId][sportId]) {
    allBookings[centerId][sportId] = allBookings[centerId][sportId].filter(booking => booking.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(allBookings));
  }
}
