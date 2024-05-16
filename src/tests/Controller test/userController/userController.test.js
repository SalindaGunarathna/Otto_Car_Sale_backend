const { login } = require('../../../controllers/userController'); // Assuming your controller file is named userController.js
const User = require('../../../model/user');

const createHttpError = require('http-errors');


// Mock dependencies
jest.mock('../../../model/user');
jest.mock('http-errors');

describe('User Controller - login', () => {
  test('should login user and return user object with token', async () => {
    // Mock request and response objects
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {
      send: jest.fn(),
    };

    const next = jest.fn();

    // Mock User model's findByCredentials method to return a user
    const mockUser = {
      _id: '123',
      email: 'test@example.com',
      generateAuthToken: jest.fn().mockReturnValue('mockToken'),
    };
    User.findByCredentials.mockResolvedValue(mockUser);

    // Call the login function
    await login(req, res,next);

    // Assert that User.findByCredentials was called with the correct arguments
    expect(User.findByCredentials).toHaveBeenCalledWith('test@example.com', 'password123');

    // Assert that user.generateAuthToken was called
    expect(mockUser.generateAuthToken).toHaveBeenCalled();

    // Assert that the response was sent with the correct user object and token
    expect(res.send).toHaveBeenCalledWith({ user: mockUser, token: 'mockToken' });
  });

  test('should handle missing email or password', async () => {
    const req = {
      body: {},
    };
    const res = {
      send: jest.fn(),
    };
    const next = jest.fn();

    // Call the login function
    await login(req, res,next);

    // Assert that createHttpError was called with the correct arguments
    expect(createHttpError).toHaveBeenCalledWith(400, "missing email or password");

    // Assert that the response was not sent
    expect(res.send).not.toHaveBeenCalled();
  });

  test('should handle user not found', async () => {
    const req = {
      body: {
        email: 'nonexistent@example.com',
        password: 'password123',
      },
    };
    const res = {
      send: jest.fn(),
    };
    const next = jest.fn();

    // Mock User model's findByCredentials method to throw an error
    User.findByCredentials.mockRejectedValue(new Error('User not found'));

    // Call the login function
    await login(req, res,next);

    // Assert that createHttpError was called with the correct arguments
    expect(createHttpError).toHaveBeenCalledWith(400, 'user not found ');

    // Assert that the response was not sent
    expect(res.send).not.toHaveBeenCalled();
  });
});
