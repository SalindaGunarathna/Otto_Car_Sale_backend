const createHttpError = require('http-errors');
var express = require('express');
const { uploadImageToDrive, deleteFile } = require('./fileUploadContrller');




const createImageAlbum = async (images) => {

  var album = [];

  var picture =images
  const { fileID, fileUploadPath } = await uploadImageToDrive(images);
        album.push({
          photoURL: fileUploadPath,
          photID: fileID,
        });


  // if (images && images.length > 0) {
  //     for (const image of images) {
  //       const { fileID, fileUploadPath } = await uploadImageToDrive(image);
  //       album.push({
  //         photoURL: fileUploadPath,
  //         photID: fileID,
  //       });

  //       console.log(album[0])
  //     }
  //   }





  return album;

}

const deleteAlbum = async (album) => {
  const images = album;
  for (const image of images) {
    const file_id = image.photID;
    const deleteStatus = await deleteFile(file_id);

    if (!deleteStatus.success) {
      throw createHttpError(400, "unable to delete image from drive");
    }
  };
}

module.exports = { createImageAlbum, deleteAlbum };