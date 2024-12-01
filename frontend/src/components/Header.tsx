import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame, LogOut, User, LayoutPanelTop } from "lucide-react";
import { getUser, dispatchClearUser } from "../context/User";

export function Header() {
  const navigate = useNavigate();
  const user = getUser();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const handleLogout = () => {
    dispatchClearUser();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={`/`} className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-primary-600" />
            <span className="font-bold text-xl text-gray-900">Makibi</span>
          </Link>

          {user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                {/* <img
                  src={user.picture}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                /> */}
                <span className="text-sm font-medium text-gray-700">
                  {user.user_id}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      to={`${user.user_id}/dashboard`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <LayoutPanelTop className="h-4 w-4 mr-3" />
                      Dashboard
                    </Link>
                    <Link
                      to={`${user.user_id}/profile`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
