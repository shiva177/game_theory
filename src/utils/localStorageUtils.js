// Utility functions to manage bookings in local storage

// Get all bookings for a specific center and sport (not filtered by date)
export function getAllBookings(centerId, sportId) {
  const allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
  return allBookings[centerId]?.[sportId] || {};
}

// Save a booking to local storage based on center, sport, and date
export function saveBooking(centerId, sportId, date, newBooking) {
  let allBookings = JSON.parse(localStorage.getItem('bookings')) || {};

  if (!allBookings[centerId]) {
    allBookings[centerId] = {};
  }
  if (!allBookings[centerId][sportId]) {
    allBookings[centerId][sportId] = {};
  }
  if (!allBookings[centerId][sportId][date]) {
    allBookings[centerId][sportId][date] = [];
  }

  allBookings[centerId][sportId][date].push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(allBookings));
}

// Update a booking in local storage
export function updateBooking(centerId, sportId, date, updatedBooking) {
  let allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
  if (allBookings[centerId] && allBookings[centerId][sportId] && allBookings[centerId][sportId][date]) {
    allBookings[centerId][sportId][date] = allBookings[centerId][sportId][date].map(booking =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    localStorage.setItem('bookings', JSON.stringify(allBookings));
  }
}

// Delete a booking from local storage
export function deleteBooking(centerId, sportId, date, bookingId) {
  let allBookings = JSON.parse(localStorage.getItem('bookings')) || {};
  if (allBookings[centerId] && allBookings[centerId][sportId] && allBookings[centerId][sportId][date]) {
    allBookings[centerId][sportId][date] = allBookings[centerId][sportId][date].filter(booking => booking.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(allBookings));
  }
}
