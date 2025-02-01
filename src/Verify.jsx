import React, { useState, useEffect } from "react";

const Verify = () => {
  const [userData, setUserData] = useState([]);
  const [searchType, setSearchType] = useState("phoneNumber");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data from backend
    fetch("/backend/user_data.json")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);

    if (trimmedQuery === "") {
      setFilteredResults([]);
      return;
    }

    // Exact match filtering
    const results = userData.filter((user) => {
      const userValue = user[searchType]?.toString().trim().toLowerCase();
      return userValue === trimmedQuery.toLowerCase();
    });

    setFilteredResults(results);
  };
  
  const handleCheckIn = () => {
    if (filteredResults.length === 0) return;
  
    setCheckedIn(true); // Show animation immediately
    setTimeout(() => {
      setCheckedIn(false);
      setSearchQuery("");
      setFilteredResults([]);
    }, 2500); // Reset UI after 2.5s
  
    const selectedUser = filteredResults[0];
  
    // Fire & Forget: Send request without waiting for a response
    fetch("http://localhost:5000/yms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedUser),
    }).catch((err) => console.error("Check-in request failed:", err));
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {checkedIn ? (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center animate-fadeIn animation-duration-500">
          <h2 className="text-3xl font-bold text-green-600 animate-pulse animation-duration-500">
            ✅ Check-In Successful!
          </h2>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800">User Verification</h2>

          {/* Search Type Selection */}
          <div className="flex justify-center gap-3 mt-6">
            {[
              { type: "phoneNumber", label: "Phone" },
              { type: "driversLicense", label: "Driver's License" },
              { type: "trailerNumber", label: "Trailer" },
              { type: "poNumber", label: "Pick Up Number" },
            ].map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-4 py-2 text-sm font-semibold border rounded-lg transition 
                ${
                  searchType === type
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <input
            type="text"
            className="mt-5 p-3 w-full border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Search by ${searchType.replace(/([A-Z])/g, " $1")}`}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Search Results */}
          <div className="mt-5">
            {filteredResults.length > 0 ? (
              filteredResults.map((user, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm mt-2 border-l-4 border-blue-500">
                  <p className="text-gray-700"><strong>📞 Phone:</strong> {user.phoneNumber}</p>
                  <p className="text-gray-700"><strong>🚗 Driver's License:</strong> {user.driversLicense}</p>
                  <p className="text-gray-700"><strong>🚛 Trailer Number:</strong> {user.trailerNumber}</p>
                  <p className="text-gray-700"><strong>📦 Pick Up Number:</strong> {user.poNumber || "N/A"}</p>
                </div>
              ))
            ) : searchQuery ? (
              <div className="text-center text-red-500 mt-3">
                ❌ No match found.
              </div>
            ) : null}
          </div>

          {/* Check In Button */}
          {filteredResults.length > 0 && (
            <button
              onClick={handleCheckIn}
              disabled={loading}
              className={`mt-5 w-full px-5 py-3 text-white font-semibold rounded-lg transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Checking In..." : "Check In"}
            </button>
          )}

          {/* Error Message */}
          {error && <p className="mt-3 text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Verify;
