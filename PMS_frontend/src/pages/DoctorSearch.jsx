import React, { useState } from "react";
import axios from "axios";

function DoctorSearch() {
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // ✅ New state

  const handleSearch = async () => {
    if (!specialty.trim()) {
      setError("Please enter a specialization.");
      return;
    }

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    setLoading(true);
    setError("");
    setDoctors([]);
    setHasSearched(false); // Reset before search

    try {
      const response = await axios.get(
        `http://localhost:8080/auth/doctors/specialization`,
        {
          params: { specialization: specialty },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(response.data);
      setHasSearched(true); // ✅ Set after API call
    } catch (err) {
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Search Doctors</h2>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Enter Specialization (e.g. Cardiologist)"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="input input-bordered w-1/2"
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary ml-4"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Doctors"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {doctors.map((doctor, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-black">{doctor.name}</h3>
                <p className="text-gray-700"><strong>Specialization:</strong> {doctor.specialization}</p>
                <p className="text-gray-700"><strong>Experience:</strong> {doctor.experience} years</p>
                <p className="text-gray-700"><strong>Location:</strong> {doctor.location}</p>
                <p className="text-gray-700"><strong>Contact:</strong> {doctor.contactNumber}</p>
              </div>
            ))}
          </div>
        )}

        {loading && <p className="text-center mt-4 text-blue-500">Loading doctors...</p>}
        
        {!loading && hasSearched && doctors.length === 0 && !error && (
          <p className="text-center mt-4 text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorSearch;
