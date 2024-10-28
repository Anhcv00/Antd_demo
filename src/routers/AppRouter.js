import { Routes, Route } from "react-router-dom";
import PhotoDetails from "../components/PhotosComponents/PhotoDetails.js";
import PhotosComponents from "../components/PhotosComponents/index.js";

import FormSignIn from "../components/SignInComponents";
import FormSignUp from "../components/SignUpComponents";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormSignIn />} />
      <Route path="/sign-up" element={<FormSignUp />} />
      <Route path="/photos" element={<PhotosComponents />} />
      <Route path="/photos/:id" element={<PhotoDetails />} />
    </Routes>
  );
}

export default AppRoutes;
