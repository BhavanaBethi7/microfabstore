import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // add other fields here
});

// Use existing model if it exists, otherwise create a new one
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
