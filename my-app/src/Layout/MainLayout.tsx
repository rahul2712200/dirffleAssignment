import Header from "../Components/Header"
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-100 mt-4 px-4">
      <Outlet />
    </div>
    </>
  );
}
