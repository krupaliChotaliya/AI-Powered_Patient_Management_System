import React, { useState, useEffect } from "react";
import axios from "axios";

function PatientHistory() {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [error, setError] = useState("");

  const role = sessionStorage.getItem("role");
  const loggedId = sessionStorage.getItem("userid");
  const token = sessionStorage.getItem("authToken");

  const handleSearch = async (idToSearch = "") => {
    if (!token || !role || !loggedId) {
      setError("Session expired or invalid. Please log in again.");
      return;
    }

    const searchId = role === "patient" ? loggedId : idToSearch;

    if (!searchId) {
      setError("Patient ID is required.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/patients/${searchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const patients = response.data;

      if (patients.length === 0) {
        setError("Patient not found.");
        setPatientData([]);
        return;
      }

      const sortedPatients = patients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPatientData(sortedPatients);
      setError("");
    } catch (err) {
      setPatientData([]);
      if (err.response && err.response.status === 404) {
        setError("No patient history available.");
      } else {
        setError("An error occurred while fetching patient data.");
      }
      console.error("Error fetching patient data:", err);
    }
  };

  // Auto-load for patients
  useEffect(() => {
    if (role === "patient") {
      handleSearch(); // Automatically uses loggedId
    }
  }, [role]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Patient Medical History</h2>
        
        {role === "doctor" && (
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="input input-bordered w-1/2"
            />
            <button
              onClick={() => handleSearch(patientId)}
              className="btn btn-primary ml-4"
            >
              Search History
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center font-medium mb-4">
            {error}
          </div>
        )}

        {patientData.length > 0 && (
          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full text-sm text-black">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Full Name</th>
                  <th className="border px-4 py-2">Contact Number</th>
                  <th className="border px-4 py-2">Blood Group</th>
                  <th className="border px-4 py-2">Age</th>
                  <th className="border px-4 py-2">Gender</th>
                  <th className="border px-4 py-2">Date of Birth</th>
                  <th className="border px-4 py-2">Allergies</th>
                  <th className="border px-4 py-2">Disease</th>
                  <th className="border px-4 py-2">Prescribed Medicine</th>
                  <th className="border px-4 py-2">Lifestyle Factors</th>
                  <th className="border px-4 py-2">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {patientData.map((patient) => (
                  <tr key={patient.id}>
                    <td className="border px-4 py-2">{patient.fullName}</td>
                    <td className="border px-4 py-2">{patient.contactNumber}</td>
                    <td className="border px-4 py-2">{patient.bloodGroup}</td>
                    <td className="border px-4 py-2">{patient.age}</td>
                    <td className="border px-4 py-2">{patient.gender}</td>
                    <td className="border px-4 py-2">{patient.dateOfBirth}</td>
                    <td className="border px-4 py-2">{patient.allergies}</td>
                    <td className="border px-4 py-2">{patient.disease}</td>
                    <td className="border px-4 py-2">{patient.prescribedMedicine}</td>
                    <td className="border px-4 py-2">{patient.lifestyleFactors}</td>
                    <td className="border px-4 py-2">{new Date(patient.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientHistory;
