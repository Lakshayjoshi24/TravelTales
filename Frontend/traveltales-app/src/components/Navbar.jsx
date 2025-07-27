import React from "react";
import LOGO from "../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./cards/ProfileInfo";
import SearchBar from "./Input/SearchBar";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md h-20 w-full flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img
            src={LOGO}
            alt="TravelTales Logo"
            className="h-20 sm:h-24 md:h-28 w-auto object-contain"
          />
        </div>

        {isToken && (
          <div className="flex items-center gap-4 md:gap-6 w-full justify-end">
            {/* Search Bar */}
            <div className="hidden sm:block w-[300px] md:w-[400px]">
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>

            {/* Profile Info */}
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
