import Business from '../../models/Business';
import { requireAuth } from '../../services/auth';

export default {
  getBusiness: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Business.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getUserBusiness: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Business.find({ user: user._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  createBusiness: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const business = await Business.create({ ...args, user: user._id });

      return business;
    } catch (error) {
      throw error;
    }
  },
  updateBusiness: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const business = await Business.findOne({ _id, user: user._id });

      if (!business) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        business[key] = value;
      });

      return business.save();
    } catch (error) {
      throw error;
    }
  },
  deleteBusiness: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const business = await Business.findOne({ _id, user: user._id });

      if (!business) {
        throw new Error('Not found!');
      }
      await business.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
};
