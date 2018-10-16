import mongoose, { Schema } from 'mongoose';

import Job from './Job';
import { JOB_FAVORITED } from '../graphql/resolvers/job-resolvers';
import { pubsub } from '../config/pubsub';

const FavoriteJobSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
}, { usePushEach: true });

FavoriteJobSchema.methods = {
  async userFavoritedJob(jobId) {
    if (this.jobs.some(j => j.equals(jobId))) {
      this.jobs.pull(jobId);
      await this.save();

      const job = await Job.decFavoriteCount(jobId);

      const j = job.toJSON();

      pubsub.publish(JOB_FAVORITED, { [JOB_FAVORITED]: { ...j } });

      return {
        isFavorited: false,
        ...j,
      };
    }

    const job = await Job.incFavoriteCount(jobId);

    const j = job.toJSON();

    this.jobs.push(jobId);
    await this.save();
    pubsub.publish(JOB_FAVORITED, { [JOB_FAVORITED]: { ...j } });
    return {
      isFavorited: true,
      ...j,
    };
  },
};

FavoriteJobSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model('FavoriteJob', FavoriteJobSchema);
