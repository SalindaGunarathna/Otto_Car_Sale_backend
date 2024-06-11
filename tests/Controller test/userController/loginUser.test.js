const request = require('supertest');
const app = require('../../../src/app'); // Assuming your Express app is exported from app.js
const User = require('../../../src/model/user'); // Importing the User model

// Mocking the User model methods
jest.mock('../../../src/model/user');

describe('User Login Endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
});
