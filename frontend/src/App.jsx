import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/AuthContext";
import socket from "./socket";
import Explore from "./pages/Explore";
import Inbox from "./pages/Inbox";
import Games from "./components/Games";
import Setting from "./components/Setting";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?.id) {
      socket.emit("join", currentUser.id);
    } else {
       navigate("/login");
    }

  }, [currentUser]);

  return (
    <>
      <Routes>
        {/* Global layout with Sidebar and Navbar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Layout>
                <Explore />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/inbox/:id?"
          element={
            <ProtectedRoute>
              <Layout>
                <Inbox />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Layout>
                <Games />
              </Layout>
            </ProtectedRoute>
          }
        />

          <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Setting />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Register page without Navbar and Sidebar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
