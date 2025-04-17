import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function MedicalForm() {
  const [formData, setFormData] = useState({
    patientId: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    bloodGroup: "",
    allergies: "",
    lifestyleFactors: {
      smoking: false,
      alcoholUse: false,
      exerciseRegularly: false,
    },
    disease: "",
    prescribedMedicine: "",
  });

  const [responseMsg, setResponseMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openAlert, setOpenAlert] = useState(false); // for snackbar
  const [isEditable, setIsEditable] = useState({
    fullName: true,
    dateOfBirth: true,
    gender: true,
    contactNumber: true,
    bloodGroup: true,
    allergies: true,
    disease: true,
    prescribedMedicine: true,
  });

  const showAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        lifestyleFactors: {
          ...prevData.lifestyleFactors,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleFetch = async () => {

    if (!formData.patientId.trim()) {
      setErrorMsg("Patient ID is required!! please enter.");
      setResponseMsg(null);
      showAlert();
      return;
    }

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      setErrorMsg("Authentication token not found. Please log in.");
      showAlert();
      return;
    }

    try {

      const response = await axios.get(
        `http://localhost:8080/auth/user?id=${formData.patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data;
      if (!userData || userData.role !== "patient") {
        setErrorMsg("No patient found with the provided ID.");
        clearForm();
        setIsEditable({
          fullName: true,
          dateOfBirth: true,
          gender: true,
          contactNumber: true,
          bloodGroup: true,
          allergies: true,
          disease: true,
          prescribedMedicine: true,
        });
        showAlert();
        return;
      }

      const patientResponse = await axios.get(
        `http://localhost:8080/patients/${formData.patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let patientData = patientResponse.data[0];

      if (!patientData) {
        clearForm();
        setErrorMsg("No medical history found for the provided patient ID.");
        setIsEditable({
          fullName: true,
          dateOfBirth: true,
          gender: true,
          contactNumber: true,
          bloodGroup: true,
          allergies: true,
          disease: true,
          prescribedMedicine: true,
        });
        showAlert();
        return;
      }

      const lifestyle = patientData.lifestyleFactors;
      const lifestyleArray = Array.isArray(lifestyle)
        ? lifestyle
        : typeof lifestyle === "string"
          ? lifestyle.split(",")
          : [];

      setFormData((prev) => ({
        ...prev,
        fullName: patientData.fullName || "",
        dateOfBirth: patientData.dateOfBirth || "",
        gender: patientData.gender?.toLowerCase() || "",
        contactNumber: patientData.contactNumber || "",
        bloodGroup: patientData.bloodGroup || "",
        allergies: patientData.allergies || "",
        lifestyleFactors: {
          smoking: lifestyleArray.includes("smoking"),
          alcoholUse: lifestyleArray.includes("alcoholUse"),
          exerciseRegularly: lifestyleArray.includes("exerciseRegularly"),
        },
      }));

      setIsEditable({
        fullName: !patientData.fullName,
        dateOfBirth: !patientData.dateOfBirth,
        gender: !patientData.gender,
        contactNumber: !patientData.contactNumber,
        bloodGroup: !patientData.bloodGroup,
        allergies: !patientData.allergies,
        disease: true,
        prescribedMedicine: true,
      });

      setErrorMsg(null);
      setResponseMsg("Patient data fetched successfully!");
      showAlert();
    } catch (error) {
      setErrorMsg(
        error.response?.status === 404
          ? "No Medical history found for the provided ID"
          : "Something went wrong!! Failed to fetch patient data."
      );
      setResponseMsg(null);
      clearForm();
      setIsEditable({
        fullName: true,
        dateOfBirth: true,
        gender: true,
        contactNumber: true,
        bloodGroup: true,
        allergies: true,
        disease: true,
        prescribedMedicine: true,
      });
      showAlert();
    }
  };

  const clearForm = () => {
    setFormData({
      patientId: "",
      fullName: "",
      dateOfBirth: "",
      gender: "",
      contactNumber: "",
      bloodGroup: "",
      allergies: "",
      lifestyleFactors: {
        smoking: false,
        alcoholUse: false,
        exerciseRegularly: false,
      },
      disease: "",
      prescribedMedicine: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg(null);
    setErrorMsg(null);

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setErrorMsg("Authentication token not found. Please log in.");
        showAlert();
        return;
      }

      const patientCheckResponse = await axios.get(
        `http://localhost:8080/auth/user?id=${formData.patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        patientCheckResponse.status === 404 ||
        patientCheckResponse.data.role === "doctor"
      ) {
        setErrorMsg("Invalid patient ID. Please check the ID and try again.");
        showAlert();
        return;
      }

      const age = calculateAge(formData.dateOfBirth);
      if (age < 0) {
        setErrorMsg("Age can't be negative. Please enter a valid Date of Birth.");
        showAlert();
        return;
      }

      const lifestyleList = Object.entries(formData.lifestyleFactors)
        .filter(([_, checked]) => checked)
        .map(([key]) => key)
        .join(",");

      const payload = {
        ...formData,
        age,
        lifestyleFactors: lifestyleList,
      };

      await axios.post("http://localhost:8080/patients", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setResponseMsg("Form submitted successfully!");
      clearForm();
      showAlert();
    } catch (error) {
      if (error.response?.status === 404) {
        setErrorMsg("Invalid patient ID. Please check the ID and try again.");
      } else {
        setErrorMsg(error.response?.data?.message || "Failed to submit the form.");
      }
      showAlert();
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", color: "#1976d2" }}
        >
          Medical Form
        </Typography>

        {/* Snackbar Alerts */}
        <Snackbar
          open={openAlert && (responseMsg !== null || errorMsg !== null)}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          {responseMsg ? (
            <Alert
              onClose={handleCloseAlert}
              severity="success"
              sx={{ width: '100%' }}
              variant="filled"
            >
              {responseMsg}
            </Alert>
          ) : errorMsg ? (
            <Alert
              onClose={handleCloseAlert}
              severity="error"
              sx={{ width: '100%' }}
              variant="filled"
            >
              {errorMsg}
            </Alert>
          ) : null}
        </Snackbar>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              label="Patient ID"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ textAlign: "center", minWidth: 450, minHeight: 50 }}
          >
            <Button variant="contained" onClick={handleFetch} fullWidth>
              Fetch
            </Button>
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
                InputProps={{ readOnly: !isEditable.fullName }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{ readOnly: !isEditable.dateOfBirth }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                required
                sx={{ minWidth: 100 }}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  disabled={!isEditable.gender}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                required
                sx={{ minWidth: 150 }}
              >
                <InputLabel>Blood Group</InputLabel>
                <Select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  label="Blood Group"
                  disabled={!isEditable.bloodGroup}
                >
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (bg) => (
                      <MenuItem key={bg} value={bg}>
                        {bg}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                name="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
                InputProps={{ readOnly: !isEditable.contactNumber }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                required
                multiline
                rows={2}
                InputProps={{ readOnly: !isEditable.allergies }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Lifestyle Factors
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.lifestyleFactors.smoking}
                    onChange={handleChange}
                    name="smoking"
                  />
                }
                label="Smoking"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.lifestyleFactors.alcoholUse}
                    onChange={handleChange}
                    name="alcoholUse"
                  />
                }
                label="Alcohol Use"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.lifestyleFactors.exerciseRegularly}
                    onChange={handleChange}
                    name="exerciseRegularly"
                  />
                }
                label="Exercise Regularly"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
                label="Disease"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={6}
                required
                sx={{ minWidth: 700 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
                label="Prescribed Medicine"
                name="prescribedMedicine"
                value={formData.prescribedMedicine}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                required
                sx={{ minWidth: 700 }}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", minWidth: 700 }}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default MedicalForm;
