const { updateUserAccount } = require('../../../controllers/userController'); // Assuming your controller file is named userController.js
const User = require('../../../model/user');
const createHttpError = require('http-errors');

// Mock dependencies
jest.mock('../../../model/user');
jest.mock('http-errors');

describe('User Controller - updateUserAccount', () => {
  test('should update user account and return updated user object', async () => {
    // Mock request and response objects
    const req = {
      user: {
        _id: '123', // Assuming a user ID is available in the request object
      },
      body: {
        firstName: 'New First Name',
        email: 'newemail@example.com',
        lastName: 'New Last Name',
        phoneNO: 9876543210,
        address: 'New Address',
      },
      files:null
    };
    const res = {
      send: jest.fn(),
    };

    // Mock User model's findById and save methods
    const mockUser = {
      _id: '123',
      firstName: 'Old First Name',
      email: 'oldemail@example.com',
      lastName: 'Old Last Name',
      phoneNO: 1234567890,
      address: 'Old Address',
      save: jest.fn(function () {
        // Update user properties based on request data
        this.firstName = req.body.firstName;
        this.email = req.body.email;
        this.lastName = req.body.lastName;
        this.phoneNO = req.body.phoneNO;
        this.address = req.body.address;
        return Promise.resolve(this); 
      }),
    };

    const next = jest.fn();
    User.findById.mockResolvedValueOnce(mockUser);

    // Call the updateUserAccount function
    await updateUserAccount(req, res,next);

    // Assert that User.findById was called with the correct arguments
    expect(User.findById).toHaveBeenCalledWith('123');

    // Assert that the user object was updated with the correct values
    expect(mockUser.firstName).toBe('New First Name');
    expect(mockUser.email).toBe('newemail@example.com');
    expect(mockUser.lastName).toBe('New Last Name');
    expect(mockUser.phoneNO).toBe(9876543210);
    expect(mockUser.address).toBe('New Address');




    expect(res.send).toHaveBeenCalledWith(mockUser);
  });



  const { updateUserAccount } = require('../../../controllers/userController'); // Assuming your controller file is named userController.js
  const User = require('../../../model/user');
  const createHttpError = require('http-errors');
  
  // Mock dependencies
  jest.mock('../../../model/user');
  jest.mock('http-errors');
  
  describe('User Controller - updateUserAccount', () => {
    test('should update user account and return updated user object', async () => {
      // Mock request and response objects
      const req = {
        user: {
          _id: '123', // Assuming a user ID is available in the request object
        },
        body: {
          firstName: 'New First Name',
          email: 'newemail@example.com',
          lastName: 'New Last Name',
          phoneNO: 9876543210,
          address: 'New Address',
        },
        files:null
      };
      const res = {
        send: jest.fn(),
      };
  
      // Mock User model's findById and save methods
      const mockUser = {
        _id: '123',
        firstName: 'Old First Name',
        email: 'oldemail@example.com',
        lastName: 'Old Last Name',
        phoneNO: 1234567890,
        address: 'Old Address',
        save: jest.fn(function () {
          // Update user properties based on request data
          this.firstName = req.body.firstName;
          this.email = req.body.email;
          this.lastName = req.body.lastName;
          this.phoneNO = req.body.phoneNO;
          this.address = req.body.address;
          return Promise.resolve(this); 
        }),
      };
  
      const next = jest.fn();
      User.findById.mockResolvedValueOnce(mockUser);
  
      // Call the updateUserAccount function
      await updateUserAccount(req, res,next);
  
      // Assert that User.findById was called with the correct arguments
      expect(User.findById).toHaveBeenCalledWith('123');
  
      // Assert that the user object was updated with the correct values
      expect(mockUser.firstName).toBe('New First Name');
      expect(mockUser.email).toBe('newemail@example.com');
      expect(mockUser.lastName).toBe('New Last Name');
      expect(mockUser.phoneNO).toBe(9876543210);
      expect(mockUser.address).toBe('New Address');
  
  
  
  
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  
  
  
    // test('should handle missing user ID if user use wrong token', async () => {
  
  
    //   const mockUser = {
    //       _id: '123',
    //       firstName: 'Old First Name',
    //       email: 'oldemail@example.com',
    //       lastName: 'Old Last Name',
    //       phoneNO: 1234567890,
    //       address: 'Old Address',
  
    //     };
  
    //   User.findById.mockResolvedValueOnce(mockUser);
  
        
    //   const req = {
    //     user: 456,
    //     body: {
    //       firstName: 'New First Name',
    //       email: 'newemail@example.com',
    //       lastName: 'New Last Name',
    //       phoneNO: 9876543210,
    //       address: 'New Address',
    //     },
    //     files:null
    //   };
    //   const res = {
    //     send: jest.fn(),
    //   };
    //   const next = jest.fn();
    //   await updateUserAccount(req, res,next);
    //   expect(next).toHaveBeenCalledWith(createHttpError(404, "User not found"));
    // });
  
   
  
  });
  

 

});
