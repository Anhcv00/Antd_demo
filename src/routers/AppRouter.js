import { Routes, Route } from "react-router-dom";
import PhotoDetails from "../components/PhotosComponents/PhotoDetails.js";
import PhotosComponents from "../components/PhotosComponents/index.jsx";
import FormSignIn from "../components/SignInComponents";
import FormSignUp from "../components/SignUpComponents";
import PrivateRoute from "../components/PhotosComponents/PrivateRoute.js";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormSignIn />} />
      <Route path="/sign-up" element={<FormSignUp />} />

      {/* Bảo vệ các trang yêu cầu xác thực */}
      <Route
        path="/photos"
        element={
          <PrivateRoute>
            <PhotosComponents />
          </PrivateRoute>
        }
      />
      <Route
        path="/photos/:id"
        element={
          <PrivateRoute>
            <PhotoDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
