import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { hasAuth, isAdmin, isOwner, canEdit } from '../auth';
import User from '../../models/User';

const LOGIN_ERROR = 'Invalid email address or password';

const getToken = ({ id, email }) => (
  jsonwebtoken.sign(
    { id, email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TTL },
  )
);

const createUser = async (attrs) => {
  const { password, ...data } = attrs;
  const hash = await User.hashPassword(password);
  const user = new User({ password: hash, ...data });
  return user.save();
};

export default {
  Query: {
    async current(root, args, { user }) {
      await hasAuth(user);
      return User.findById(user.id).exec();
    },

    async user(root, args, { user }) {
      await hasAuth(user);
      return User.findOne(args).exec();
    },

    async users(root, args, { user }) {
      await hasAuth(user);
      return User.find({}).exec();
    },
  },
  Mutation: {
    async addUser(root, { input }, { user }) {
      await isAdmin(user);
      return createUser(input);
    },

    async editUser(root, { input }, { user }) {
      await isAdmin(user);
      const { id, ...data } = input;
      return User.findByIdAndUpdate(id, { $set: { data } }).exec();
    },

    async editUserProfile(root, { input }, { user }) {
      const { id, ...data } = input;
      await isOwner(user, id);
      return User.findByIdAndUpdate(id, { $set: { data } }).exec();
    },

    async deleteUser(root, { id }, { user }) {
      await isOwner(user, id);
      return User.findByIdAndRemove(id).exec();
    },

    async signup(root, { input }) {
      const user = await createUser(input);
      return { user, token: getToken(user) };
    },

    async login(root, { email, password }) {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error(LOGIN_ERROR); // user not found
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error(LOGIN_ERROR); // invalid password
      }

      return { user, token: getToken(user) };
    },

    async changePassword(root, { input }, { user }) {
      const { id, oldPassword, newPassword } = input;
      const existing = await canEdit(user, id, User);
      const isValid = await bcrypt.compare(oldPassword, existing.password);

      if (!isValid) {
        throw new Error('Invalid existing password.'); // invalid password
      }
      const hash = await User.hashPassword(newPassword);
      return User.findByIdAndUpdate(id, { $set: { password: hash } });
    },
  },
};
