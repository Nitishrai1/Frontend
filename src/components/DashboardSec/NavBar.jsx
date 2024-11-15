import React, { useState, useEffect, useRef } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

export default function NavBarSection({
  setFilteredTodos,
  setSearchQuery,
  userdata,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [newNotification, setNewNotification] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    updateNotification();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
      if (isNotificationOpen && !event.target.closest(".notification-dropdown")) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, isNotificationOpen]);

  const updateNotification = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/user/unreadNotification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });

      const data = await response.json();
      const unreadNotifications = data.unreadNotification.map((notification) => ({
        message: notification.message,
        projectDetails: notification.projectDetails,
      }));

      setNewNotification(unreadNotifications || []);
      setUnreadCount(unreadNotifications.length || 0);

      const response2 = await fetch(`${apiUrl}/user/allNotification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
      });
      const data2 = await response2.json();

      const allNotifications = data2.allNotification.map((notification) => ({
        message: notification.message,
        projectDetails: notification.projectDetails,
      }));

      setNotification(allNotifications || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching notifications:", err);
    }
  };

  const handleChange = (e) => {
    const query = e.target.value;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchQuery(query);
      if (query.trim() !== "") {
        updateFilteredTodo(query);
      }
    }, 500);
  };

  const updateFilteredTodo = async (query) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/user/Search/${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFilteredTodos(data.task);
      } else {
        console.error("Error fetching filtered data");
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    updateNotification();
  };

  return (
    <nav className="bg-[#f2f6fe] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 flex items-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative notification-dropdown">
              <button
                className="relative p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleNotification}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
              </button>
              {isNotificationOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                    {newNotification.length > 0 ? (
                      <ul className="space-y-2">
                        {newNotification.map((notification, index) => (
                          <li key={index} className="border-b last:border-none pb-2">
                            <p className="font-medium">{notification.message}</p>
                            <a
                              href={notification.projectDetails}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline text-sm"
                            >
                              View Project
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative user-dropdown">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={userdata?.ImageLink || "/default-profile.png"}
                  alt="User profile"
                />
                <span className="text-sm font-medium text-gray-700">
                  {userdata?.username || "Guest"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}