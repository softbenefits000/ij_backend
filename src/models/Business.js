import mongoose, { Schema } from 'mongoose';

const BusinessSchema = new Schema({
  name: {
    type: String,
    minlength: [5, 'Text need to be longer'],
    maxlength: [30, 'Text too long'],
  },
  activityDomain: {
    type: String
  },
  description: {
    type: String
  },
  logo: {
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
  email: {
    type: String
  },
  businessType: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  followingsCount: {
    type: Number,
    default: 0
  },
  followersCount: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

export default mongoose.model('Business', BusinessSchema);
