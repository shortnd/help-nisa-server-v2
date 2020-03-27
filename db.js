const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    process.env.MONGO_URI ||
    'mongodb://localhost/nisa-server'
  , {
    useNewUrlParser: true,
    useCreateIndex: true
  })
}

module.exports = mongoose
