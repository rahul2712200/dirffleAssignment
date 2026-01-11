import Header from "../Components/Header"
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex items-center justify-center w-100 mt-4 px-4">
      <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
