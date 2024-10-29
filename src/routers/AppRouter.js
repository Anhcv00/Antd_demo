import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import Layout from "../components/Layout";
import { SignInComponents, SignUpComponents } from "../components/Auth";
import {
  ViewPhotosComponents,
  DashboardComponents,
  UserManagementComponents,
  VideoManagementComponents,
  UploadNewPhotoComponents,
  BulkUploadComponents,
  PhotoGalleryComponents,
  PhotoSettingsComponents,
  ProfileSettingsComponents,
  ChangePasswordComponents,
} from "../pages";
import { PhotoDetailsComponents } from "../components/Photo";
import NotFound from "../components/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<SignInComponents />} />
      <Route path="/sign-up" element={<SignUpComponents />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
        <Route path="/dashboard" element={<DashboardComponents />} />
        <Route path="/photos/view" element={<ViewPhotosComponents />} />
        <Route path="/user-management" element={<UserManagementComponents />} />
        <Route
          path="/video-management"
          element={<VideoManagementComponents />}
        />
        <Route
          path="/upload-photos/new"
          element={<UploadNewPhotoComponents />}
        />
        <Route path="/upload-photos/bulk" element={<BulkUploadComponents />} />
        <Route path="/photos/gallery" element={<PhotoGalleryComponents />} />
        <Route path="/photos/settings" element={<PhotoSettingsComponents />} />
        <Route path="/photos/:id" element={<PhotoDetailsComponents />} />
        <Route
          path="/settings/profile"
          element={<ProfileSettingsComponents />}
        />
        <Route
          path="/settings/change-password"
          element={<ChangePasswordComponents />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
