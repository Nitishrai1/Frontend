import React, { useState, Suspense, useEffect, useRef } from "react";
import { Trophy, Search, ChevronRight } from "lucide-react";

const UserCard = React.lazy(() => import("./UserCard/UserCard"));

const TopDeveloper = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-sm mx-auto">
      <div className="text-gray-700 space-y-1">
        <div>
          <span className="font-medium">Username: </span>
          {user.username}
        </div>
        <div>
          <span className="font-medium">Email: </span>
          {user.email}
        </div>
      </div>
    </div>
  );
};

export default function UserGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setAllDeveloper] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!searchQuery) {
      fetchDeveloperData();
    }
    fetchTopDeveloperData();
  }, [page]);

  useEffect(() => {
    clearTimeout(debounceTimer.current);

    if (searchQuery.trim() === "") {
      fetchDeveloperData();
      return;
    }

    debounceTimer.current = setTimeout(() => {
      fetchUserByEmail(searchQuery.trim());
    }, 500);

    return () => clearTimeout(debounceTimer.current);
  }, [searchQuery]);

  const fetchDeveloperData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/user/allUsers?page=${page}&limit=${limit}`);
      const data = await response.json();
      if (response.ok) {
        setAllDeveloper(data.userdata);
        setTotalPages(Math.ceil((data.totaluser || 0) / limit));
      } else {
        console.error("Failed to fetch developers");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopDeveloperData = async () => {
    try {
      const response = await fetch(`${apiUrl}/user/topUsers?limit=5`);
      const data = await response.json();
      if (response.ok) {
        setTopUsers(data.topUsers || []);
      } else {
        console.warn("Using fallback for top users");
        setTopUsers(users.slice(0, 5));
      }
    } catch (err) {
      console.error("Top developer fetch error:", err);
      setTopUsers(users.slice(0, 5));
    }
  };

  const fetchUserByEmail = async (email) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/user/getuser?userEmail=${email}`);
      const data = await response.json();
      console.log("data is ",data.user);
      if (response.ok && data.user) {
        let arr=[]
        arr.push(data.user);
        setAllDeveloper(arr);
      } else {
        setAllDeveloper([]);
      }
    } catch (err) {
      console.error("Error fetching user by email:", err);
      setAllDeveloper([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-green-700">All Developers</h1>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto py-8 px-4 mt-24">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Developer List */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-green-700">Page {page} of {totalPages}</div>
            </div>

            <div className="h-[600px] overflow-y-auto pr-2 rounded-lg border border-green-200 bg-white bg-opacity-50 shadow-sm">
              {isLoading ? (
                <div className="flex justify-center items-center h-full text-green-700">Loading developers...</div>
              ) : (
                <Suspense fallback={<div className="text-center text-green-700 py-4">Loading users...</div>}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-4">
                    {users.length > 0 ? (
                      users.map((user, index) => <UserCard key={index} user={user} />)
                    ) : (
                      <div className="col-span-2 text-center py-8 text-gray-500">No developers found</div>
                    )}
                  </div>
                </Suspense>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={page <= 1}
                className="text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages || isLoading}
                className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Top Developers */}
          <div className="w-full lg:w-1/4 bg-white bg-opacity-50 rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-green-700">Top Developers</h2>
            </div>
            <Suspense fallback={<div className="text-center text-green-700">Loading top users...</div>}>
              <div className="space-y-4">
                {topUsers.length > 0 ? (
                  topUsers.map((user, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                      <TopDeveloper user={user} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">No top developers found</div>
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
