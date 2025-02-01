import React, { useState } from "react";

const Verify = () => {
  const [searchType, setSearchType] = useState("phoneNumber");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setFilteredResults([]);
      setError("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.kaifany.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [searchType]: trimmedQuery }),
      });

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setFilteredResults(data);
      } else {
        setFilteredResults([]);
        setError("No results found.");
      }
    } catch (err) {
      console.error("Search request failed:", err);
      setError("Error searching, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (filteredResults.length === 0) return;

    setCheckedIn(true);
    setTimeout(() => {
      setCheckedIn(false);
      setSearchQuery("");
      setFilteredResults([]);
    }, 2500);

    const selectedUser = filteredResults[0];

    try {
      await fetch("http://localhost:5000/yms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser),
      });
    } catch (err) {
      console.error("Check-in request failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {checkedIn ? (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center animate-fadeIn">
          <h2 className="text-3xl font-bold text-green-600 animate-pulse">✅ Check-In Successful!</h2>
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
                className={`px-4 py-2 text-sm font-semibold border rounded-lg transition ${
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className={`mt-4 w-full px-5 py-3 text-white font-semibold rounded-lg transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>

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
            ) : error ? (
              <div className="text-center text-red-500 mt-3">{error}</div>
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
        </div>
      )}
    </div>
  );
};

export default Verify;
