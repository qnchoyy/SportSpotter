import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-900 to-black text-gray-100">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
