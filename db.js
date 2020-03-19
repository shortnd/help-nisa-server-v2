import mongoose from 'mongoose';

mongoose.connect(
  process.env.MONGO_URI ||
  'mongodb://localhost/nisa-server'
, {
  useNewUrlParser: true,
  useCreateIndex: true
})

export default mongoose
