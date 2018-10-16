import User from '../../models/User';
import FavoriteJob from '../../models/FavoriteJob';
import FollowingUser from '../../models/FollowingUser';
import { requireAuth } from '../../services/auth';

export default {
  signup: async (_, { ...rest }) => {
    try {
      const user = await User.create({ ...rest });
      await FavoriteJob.create({ userId: user._id });
      await FollowingUser.create({ userId: user._id });

      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },

  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('User not exist!');
      }

      if (!user.authenticateUser(password)) {
        throw new Error('Password not match!');
      }

      return {
        token: user.createToken()
      };
    } catch (error) {
      throw error;
    }
  },

  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);

      return me;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const userUpdated = await User.findOne({ _id });

      if (!user) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        userUpdated[key] = value;
      });

      return userUpdated.save();
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const userDelete = await User.findOne({ _id });

      if (!user) {
        throw new Error('Not found!');
      }
      await userDelete.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  }
};
