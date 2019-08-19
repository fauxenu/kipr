import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userRoles from '../enums/userRoles';

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: { type: String, trim: true },
  role: { type: String, enum: Object.values(userRoles), default: userRoles.PLAYER },
}, { timestamps: true });

UserSchema.static('hashPassword', async (password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
});

const User = mongoose.model('User', UserSchema);
export default User;
