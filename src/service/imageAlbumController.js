const createHttpError = require('http-errors');
var express = require('express');



const createImageAlbum = async (images) => {
  var album = [];
  for (const filepath of images) {
    album.push({
      photoURL: filepath,
    });

  }
  return album;

}

// delete image albume
const deleteAlbum = async (album) => {
  const images = album;
  for (const image of images) {
    const file_url = image.photoURL;
    const deleteStatus = await deleteFile(file_url);

    if (deleteStatus !== 204) {
      throw createHttpError(400, "unable to delete image from drive");
    }
  };
}

module.exports = { createImageAlbum, deleteAlbum };