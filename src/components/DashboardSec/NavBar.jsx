import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
  AwardIcon,
  NewspaperIcon,
} from "lucide-react";
import io from "socket.io-client";

const Back_End_url = import.meta.env.BACKEND_URL;
const apiUrl = import.meta.env.VITE_API_URL;

export default function NavBarSection({
  filteredTodos,
  setFilteredTodos,
  searchquery,
  setSearchquery,
  userdata,
}) {
  const developerId = userdata._id;
  const timerRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("/placeholder.svg");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [newnotification, setnewNotification] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState();
  const [onOpen, setOpen] = useState(false);

  useEffect(() => {
    updateNotification();

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (searchquery.trim() !== "") {
      updateFilteredTodo();
    }
  }, [searchquery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".relative")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const updateNotification = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/user/unreadNotification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      setnewNotification(data.unreadNotification);
      setUnreadCount(data.unreadNotification.length);

      const response2 = await fetch(`${apiUrl}/user/allNotification`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      });
      const data2 = await response2.json();
      setNotification(data2.allNotification);
    } catch (err) {
      setError(err.message);
      alert("Error in fetching the notification");
    }
  };

  function handleChange(e) {
    const query = e.target.value;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setSearchquery(query);
      console.log(`Search query updated to: ${query}`);
    }, 500);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `${apiUrl}/user/Search/upload-profile-picture`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        setPreviewImage(data.imageUrl);
        console.log(`Image link in the frontend is ${data.imageUrl}`);
        const userimage = await updateuserprofile({ userImage: data.imageUrl });

        if (!userimage.ok) {
          alert("Error in saving the image link in the database");
        } else {
          alert("Image link saved in the database successfully");
        }
      } else {
        alert(`Error uploading image: ${data.error}`);
      }
    } catch (error) {
      console.error("Error uploading image in cloud", error);
    }
  };

  async function updateuserprofile({ userImage }) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/user/updatePhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ profilepicture: userImage }),
      });

      if (!response.ok) {
        alert("Error in uploading image. Please try again.");
      }

      const res = await response.json();
      alert(res.msg);
    } catch (err) {
      console.error("Error in backend:", err);
      alert(`Error: ${err}`);
    }
  }

  async function updateFilteredTodo() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/user/Search/${searchquery}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Filtered data fetched successfully`, data.task);
        setFilteredTodos(data.task);
      } else {
        console.error("Error fetching filtered data");
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdown = () => setOpen(!onOpen);

  return (
    <nav className="bg-[#f2f6fe] poppins-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center">
            <div className="relative">
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
          <div className="flex items-center">
            <span>{unreadCount}</span>
            <Bell className="h-6 w-6 cursor-pointer" onClick={handleDropdown} />
            {onOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                  {newnotification.length > 0 ? (
                    <ul className="space-y-2">
                      {newnotification.map((notification, index) => (
                        <li
                          key={index}
                          className="border-b last:border-none pb-2"
                        >
                          <p className="font-medium text-gray-800">
                            {notification.message}
                          </p>
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
                    <p className="text-sm text-gray-500">
                      No new notifications
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="ml-4 flex items-center relative">
              <img
                className="h-8 w-8 rounded-full cursor-pointer"
                src={userdata?.ImageLink || "/default-profile.png"}
                alt="User profile"
                onClick={toggleDropdown}
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {userdata?.username || "Guest"}
              </span>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="ml-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  ▼
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-1">
                      <label className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                        Upload Image
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={handleImageUpload}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        Save Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-10 w-10">
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
