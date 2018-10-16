import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema({
  name: {
    type: String,
    minlength: [5, 'Text need to be longer'],
    maxlength: [144, 'Text too long'],
  },
  description: {
    type: String
  },
  houseName: {
    type: String
  },
  streetName: {
    type: String
  },
  city: {
    type: String
  },
  postCode: {
    type: String
  },
  jobLength: {
    type: String
  },
  contractType: {
    type: String
  },
  workingType: {
    type: String
  },
  salary: {
    type: String
  },
  background: {
    type: String
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

JobSchema.statics = {
  incFavoriteCount(jobId) {
    return this.findByIdAndUpdate(jobId, { $inc: { favoriteCount: 1 } }, { new: true });
  },
  decFavoriteCount(jobId) {
    return this.findByIdAndUpdate(jobId, { $inc: { favoriteCount: -1 } }, { new: true });
  }
}

export default mongoose.model('Job', JobSchema);
