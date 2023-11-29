import mongoose from 'mongoose';
import UserModel from '../models/userSchema.js';
import { faker } from '@faker-js/faker';

/* await mongoose.connect(
  `mongodb+srv://anuch:j0iLuClecIyE2Iy9@cluster0.4wuv4h7.mongodb.net/bookstore`
);
console.log('connected to seed'); */

const generateUsers = async () => {
  for (let i = 0; i < 5; i++) {
    await UserModel.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  return;
};

//generateUsers().then(() => mongoose.connection.close());
