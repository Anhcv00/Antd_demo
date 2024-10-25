import { Routes, Route } from "react-router-dom";
import PhotoDetails from "../components/TableComponents/PhotoDetails.js";
import TableComponents from "../components/TableComponents/index.js";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TableComponents />} />
      <Route path="/photos/:id" element={<PhotoDetails />} />
    </Routes>
  );
}

export default AppRoutes;
