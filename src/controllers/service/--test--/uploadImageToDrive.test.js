const { uploadImageToDrive } = require('../fileUploadContrller');

describe('uploadImageToDrive', () => {
  it('should upload an image file successfully', async () => {
    const file = { mimetype: 'image/jpeg', name: 'test.jpg' };
    const result = await uploadImageToDrive(file);
    expect(result.filepath).toBeDefined();
    // Add more assertions if needed
  });

  it('should throw an error if file type is not an image', async () => {
    const file = { mimetype: 'text/plain', name: 'test.txt' };
    await expect(uploadImageToDrive(file)).rejects.toThrow('Only images are allowed');
  });
});
