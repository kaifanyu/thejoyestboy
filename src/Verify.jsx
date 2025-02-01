import React, { useState } from "react";
import "./Verify.css"; // Import CSS file

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
    <div className="container">
      {checkedIn ? (
        <div className="success-message">
          <h2>✅ Check-In Successful!</h2>
        </div>
      ) : (
        <div className="verification-box">
          <h2>User Verification</h2>

          {/* Search Type Selection */}
          <div className="button-group">
            {[
              { type: "phoneNumber", label: "Phone" },
              { type: "driversLicense", label: "Driver's License" },
              { type: "trailerNumber", label: "Trailer" },
              { type: "poNumber", label: "Pick Up Number" },
            ].map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={searchType === type ? "selected" : ""}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <input
            type="text"
            className="search-input"
            placeholder={`Search by ${searchType.replace(/([A-Z])/g, " $1")}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Search Button */}
          <button onClick={handleSearch} disabled={loading} className="search-button">
            {loading ? "Searching..." : "Search"}
          </button>

          {/* Search Results */}
          <div className="results">
            {filteredResults.length > 0 ? (
              filteredResults.map((user, index) => (
                <div key={index} className="result-card">
                  <p><strong>📞 Phone:</strong> {user.phoneNumber}</p>
                  <p><strong>🚗 Driver's License:</strong> {user.driversLicense}</p>
                  <p><strong>🚛 Trailer Number:</strong> {user.trailerNumber}</p>
                  <p><strong>📦 Pick Up Number:</strong> {user.poNumber || "N/A"}</p>
                </div>
              ))
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : null}
          </div>

          {/* Check In Button */}
          {filteredResults.length > 0 && (
            <button onClick={handleCheckIn} disabled={loading} className="check-in-button">
              {loading ? "Checking In..." : "Check In"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
