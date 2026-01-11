import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ListingPage from "../Pages/ListingPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/listing" />} />
        <Route path="/listing" element={<ListingPage />} />
      </Route>
    </Routes>
  );
}
