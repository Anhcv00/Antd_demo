// Acount defaults
const defaultAccounts = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    password: "123",
    role: "admin",
  },
  {
    id: 2,
    firstName: "Savar",
    lastName: "Lemons",
    email: "lemons@gmail.com",
    password: "123",
    role: "admin",
  },
  {
    id: 3,
    firstName: "La vi en",
    lastName: "Rose",
    email: "rose@gmail.com",
    password: "123",
    role: "admin",
  },
];

const ACOUNTS_KEY = "accounts";
const PHOTOS_KEY = "photos";

// Get all acount from storage
export const getAccountsFromStorage = () => {
  let accounts = JSON.parse(localStorage.getItem(ACOUNTS_KEY));
  if (!accounts) {
    saveAccountsToStorage(defaultAccounts);
    accounts = defaultAccounts;
  }
  return Array.isArray(accounts) ? accounts : [];
};

// Save
export const saveAccountsToStorage = (accounts) => {
  localStorage.setItem(ACOUNTS_KEY, JSON.stringify(accounts));
  console.log("Saved accounts to storage");
  console.log(accounts);
};

// Get all photos from storage
export const getPhotosFromStorage = () => {
  const photos = JSON.parse(localStorage.getItem("photos"));
  return Array.isArray(photos) ? photos : [];
};

// Save
export const savePhotosToStorage = (photos) => {
  localStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
};

// Update
export const updatePhotoInStorage = (updatedPhotos) => {
  if (Array.isArray(updatedPhotos)) {
    localStorage.setItem("photos", JSON.stringify(updatedPhotos));
  } else {
    console.error("Updated photos is not an array");
  }
};

// Delete
export const deletePhotoFromStorage = (photoId) => {
  const photos = getPhotosFromStorage();
  const updatedPhotos = photos.filter((photo) => photo.id !== photoId);
  savePhotosToStorage(updatedPhotos);
};
