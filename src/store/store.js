const PHOTOS_KEY = "photos";

// Get all photos from storage
export const getPhotosFromStorage = () => {
  const storedPhotos = localStorage.getItem(PHOTOS_KEY);
  return storedPhotos ? JSON.parse(storedPhotos) : [];
};

// Save
export const savePhotosToStorage = (photos) => {
  localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
};

// Update
export const updatePhotoInStorage = (updatedPhoto) => {
  const photos = getPhotosFromStorage();
  const updatedPhotos = photos.map((photo) =>
    photo.id === updatedPhoto.id ? updatedPhoto : photo
  );
  savePhotosToStorage(updatedPhotos);
};

// Delete
export const deletePhotoFromStorage = (photoId) => {
  const photos = getPhotosFromStorage();
  const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
  savePhotosToStorage(updatedPhotos);
};
