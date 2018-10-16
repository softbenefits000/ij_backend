import GraphQLDate from 'graphql-date';

import JobResolvers from './job-resolvers';
import BusinessResolvers from './business-resolvers';
import UserResolvers from './user-resolvers';
import Business from '../../models/Business';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Business: {
    user: ({ user }) => User.findById(user),
  },
  Job: {
    business: ({ business }) => Business.findById(business),
  },
  Query: {
    getJob: JobResolvers.getJob,
    getJobs: JobResolvers.getJobs,
    getBusiness: BusinessResolvers.getBusiness,
    getUserBusiness: BusinessResolvers.getUserBusiness,
    getBusinessJobs: JobResolvers.getBusinessJobs,
    me: UserResolvers.me
  },
  Mutation: {
    createJob: JobResolvers.createJob,
    updateJob: JobResolvers.updateJob,
    deleteJob: JobResolvers.deleteJob,
    createBusiness: BusinessResolvers.createBusiness,
    updateBusiness: BusinessResolvers.updateBusiness,
    deleteBusiness: BusinessResolvers.deleteBusiness,
    favoriteJob: JobResolvers.favoriteJob,
    signup: UserResolvers.signup,
    login: UserResolvers.login,
    updateUser: UserResolvers.updateUser,
    deleteUser: UserResolvers.deleteUser
  },
  Subscription: {
    jobAdded: JobResolvers.jobAdded,
    jobFavorited: JobResolvers.jobFavorited
  }
};
