import React, { useContext, useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(
    async (query) => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/users/search?query=${query}`,
          { withCredentials: true }
        );
        setSearchResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, fetchUsers]);

  async function onLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
        {/* Logo */}
        <h2 className="text-2xl font-bold text-blue-600">mySocial</h2>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search creators, inspirations, projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="absolute w-full bg-white border rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto z-50">
              {loading ? (
                <p className="p-2 text-gray-500">Loading...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery("");
                      navigate(`/profile/${user.id}`);
                    }}
                  >
                    <img
                      src={`/uploads/${user.profilePic}`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="text-gray-700 text-sm">{user.name}</span>
                  </div>
                ))
              ) : (
                <p className="p-2 text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Logout & Profile */}
        <div className="flex items-center gap-3">
          <button
            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition"
            onClick={onLogout}
          >
            Logout
          </button>
          <img
            src={`/uploads/${currentUser.profilePic}`}
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
