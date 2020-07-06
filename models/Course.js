// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  dateAndTime: {
    type: Date,
    required: true,
    set: val => {
      return new Date(val);
    },
    get: val => {
      const dateAndTime = val.toISOString();
      return dateAndTime.substring(0, dateAndTime.length - 1);
    }
  },
  quantityOfSwimmers: {
    type: Number,
    required: true
  },
  tier: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Course', CourseSchema);