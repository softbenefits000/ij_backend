import faker from 'faker';

import Job from '../models/Job';
import User from '../models/User';

const JOBS_TOTAL = 3;
const USERS_TOTAL = 3;

export default async () => {
  try {
    await Job.remove();
    await User.remove();

    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123'
      });

      await Array.from({ length: JOBS_TOTAL }).forEach(
        async () => await Job.create({ text: faker.lorem.sentence(), user: user._id }),
      );
    });
  } catch (error) {
    throw error;
  }
};
