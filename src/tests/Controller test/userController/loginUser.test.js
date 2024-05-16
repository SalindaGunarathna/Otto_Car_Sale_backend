const request = require('supertest');
const app = require('../../../app'); // Assuming your Express app is exported from app.js
const User = require('../../../model/user'); // Importing the User model

// Mocking the User model methods
jest.mock('../../../model/user');

describe('User Login Endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('should log in a user with valid credentials', async () => {
  //   // Mocking the findByCredentials method of the User model to return a user
  //   User.findByCredentials.mockResolvedValueOnce({
  //     _id: 'user_id',
  //     email: 'test@example.com',
  //     role: 'Customer',
  //     generateAuthToken: jest.fn().mockResolvedValue('token')
  //   });

  //   const response = await request(app)
  //     .post('/login')
  //     .send({ email: 'test@example.com', password: 'Test123@' })
  //     .expect(200);

  //   expect(response.body).toHaveProperty('user');
  //   expect(response.body.user).toHaveProperty('_id', 'user_id');
  //   expect(response.body).toHaveProperty('token', 'token');
  // });

  // it('should return an error for missing email or password', async () => {
  //   const response = await request(app)
  //     .post('/login')
  //     .send({ email: '', password: 'Test123@' })
  //     .expect(400);

  //   expect(response.body.error).toBe('missing email or password');
  // });

  // it('should return an error if user not found', async () => {
  //   // Mocking the findByCredentials method of the User model to throw an error
  //   User.findByCredentials.mockRejectedValueOnce(new Error('Unable to login. User not found.'));

  //   const response = await request(app)
  //     .post('/login')
  //     .send({ email: 'nonexistent@example.com', password: 'Test123@' })
  //     .expect(400);

  //   expect(response.body.error).toBe('User not found');
  // });

  // it('should return an error for incorrect password', async () => {
  //   // Mocking the findByCredentials method of the User model to throw an error
  //   User.findByCredentials.mockRejectedValueOnce(new Error('Unable to login. Incorrect password.'));

  //   const response = await request(app)
  //     .post('/login')
  //     .send({ email: 'test@example.com', password: 'WrongPassword123@' })
  //     .expect(400);

  //   expect(response.body.error).toBe('Incorrect password');
  // });
});
