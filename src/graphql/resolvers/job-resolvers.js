import Job from '../../models/Job';
import FavoriteJob from '../../models/FavoriteJob';
import { requireAuth } from '../../services/auth';
import { pubsub } from '../../config/pubsub';

const JOB_ADDED = 'jobAdded';
export const JOB_FAVORITED = 'jobFavorited';

export default {
  getJob: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Job.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  getJobs: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const p1 = Job.find({}).sort({ createdAt: -1 });
      const p2 = FavoriteJob.findOne({ userId: user._id });
      const [jobs, favorites] = await Promise.all([p1, p2]);

      const jobsToSend = jobs.reduce((arr, job) => {
        const j = job.toJSON();

        if (favorites.jobs.some(t => t.equals(job._id))) {
          arr.push({
            ...j,
            isFavorited: true,
          });
        } else {
          arr.push({
            ...j,
            isFavorited: false,
          })
        }

        return arr;
      }, []);

      return jobsToSend;
    } catch (error) {
      throw error;
    }
  },
  getBusinessJobs: async (_, args, { user, business }) => {
    try {
      await requireAuth(user);
      return Job.find({ business: business._id }).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  createJob: async (_, args, { user, business }) => {
    try {
      await requireAuth(user);
      const job = await Job.create({ ...args, business: business._id });

      pubsub.publish(JOB_ADDED, { [JOB_ADDED]: job });

      return job;
    } catch (error) {
      throw error;
    }
  },
  updateJob: async (_, { _id, ...rest }, { user, business }) => {
    try {
      await requireAuth(user);
      const job = await Job.findOne({ _id, business: business._id });

      if (!job) {
        throw new Error('Not found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        job[key] = value;
      });

      return job.save();
    } catch (error) {
      throw error;
    }
  },
  deleteJob: async (_, { _id }, { user, business }) => {
    try {
      await requireAuth(user);
      const job = await Job.findOne({ _id, business: business._id });

      if (!job) {
        throw new Error('Not found!');
      }
      await job.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  },
  favoriteJob: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const favorites = await FavoriteJob.findOne({ userId: user._id });

      return favorites.userFavoritedJob(_id);
    } catch (error) {
      throw error;
    }
  },
  jobAdded: {
    subscribe: () => pubsub.asyncIterator(JOB_ADDED)
  },
  jobFavorited: {
    subscribe: () => pubsub.asyncIterator(JOB_FAVORITED),
  }
};
