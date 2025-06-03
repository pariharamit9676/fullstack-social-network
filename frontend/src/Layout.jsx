import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/index";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex flex-col justify-between gap-8 relative">
        <div className="flex min-w-[100%] gap-10">
        <Sidebar />
        <section className="w-full dark:bg-gray-800 p-6 rounded-lg shadow-md flex justify-center">
          {children}
        </section>
        </div>
      </main>
    </div>
  );
};

export default Layout;
