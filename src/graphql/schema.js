export default `
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    email: String!
    firstName: String
    lastName: String
    avatar: String
    role: String
    phone: String
    houseName: String
    streetName: String
    city: String
    postCode: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    email: String!
    firstName: String
    lastName: String
    avatar: String
    role: String
    phone: String
    houseName: String
    streetName: String
    city: String
    postCode: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Business {
    _id: ID!
    name: String
    activityDomain: String!
    description: String
    logo: String
    houseName: String
    streetName: String
    city: String
    postCode: String
    email: String
    businessType: String
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }

  type Job {
    _id: ID!
    name: String!
    description: String!
    houseName: String!
    streetName: String!
    city: String!
    postCode: String!
    jobLength: String!
    contractType: String!
    workingType: String!
    salary: String!
    background: String
    business: Business!
    favoriteCount: Int!
    isFavorited: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getJob(_id: ID!): Job
    getJobs: [Job]
    getBusiness(_id: ID!): Business
    getUserBusiness: [Business]
    getBusinessJobs: [Job]
    me: Me
  }

  type Mutation {
    createJob(name: String!, description: String!, houseName: String!, streetName: String!, city: String!, postCode: String!, jobLength: String!, contractType: String!, workingType: String!, salary: String!, background: String!): Job
    updateJob(_id: ID!, name: String, description: String, houseName: String, streetName: String, city: String, postCode: String, jobLength: String, contractType: String, workingType: String, salary: String, background: String): Job
    deleteJob(_id: ID!): Status
    favoriteJob(_id: ID!): Job
    createBusiness(name: String!, activityDomain: String!, description: String!, logo: String!, houseName: String!, streetName: String!, city: String!, postCode: String!, email: String!, businessType: String!): Business
    updateBusiness(_id: ID!, name: String, activityDomain: String, description: String, logo: String, houseName: String, streetName: String, city: String, postCode: String, email: String, businessType: String): Business
    deleteBusiness(_id: ID!): Status
    signup(email: String!, password: String!, role: String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(_id: ID!, email: String, password: String, firstName: String, lastName: String): User
    deleteUser(_id: ID!): Status
  }

  type Subscription {
    jobAdded: Job
    jobFavorited: Job
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
