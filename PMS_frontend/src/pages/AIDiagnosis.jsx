import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function AIDiagnosis() {
  const [patientId, setPatientId] = useState('');
  const [symptomsText, setSymptomsText] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    setUserRole(role);

    if (role === 'patient') {
      const storedPatientId = sessionStorage.getItem('userid');
      setPatientId(storedPatientId || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDiagnosis('');
    setLoading(true);

    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('Unauthorized. Please login.');
        setLoading(false);
        return;
      }

      // Doctor: Validate patient ID before proceeding
      if (userRole === 'doctor') {
        const userCheckRes = await axios.get(`http://localhost:8080/auth/user`, {
          params: { id: patientId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = userCheckRes.data;

        if (!user || user.role !== 'patient') {
          setError('Patient not found with the given ID.');
          setLoading(false);
          return;
        }
      }

      const symptomsList = symptomsText
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const requestBody = {
        patientId: parseInt(patientId),
        symptoms: symptomsList,
      };

      const aiRes = await axios.post(
        'http://localhost:8080/diagnosis/suggest',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const raw = aiRes.data.diagnosis;
      const cleanDiagnosis = raw.includes('</think>') ? raw.split('</think>')[1].trim() : raw;
      setDiagnosis(cleanDiagnosis);

    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError('Patient not found with the given ID.');
      } else {
        setError('Something went wrong. Please check the Patient ID and symptoms.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
          AI Diagnosis
        </Typography>

        <form onSubmit={handleSubmit}>
          {userRole === 'doctor' && (
            <TextField
              label="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              fullWidth
              type="number"
              variant="outlined"
              required
              sx={{ marginBottom: 3 }}
            />
          )}

          <TextField
            label="Enter symptoms (comma-separated)"
            value={symptomsText}
            onChange={(e) => setSymptomsText(e.target.value)}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            required
            sx={{ marginBottom: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '12px', fontSize: '16px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Diagnosis'}
          </Button>
        </form>

        {error && (
          <Typography sx={{ color: 'red', marginTop: 2 }}>{error}</Typography>
        )}

        {diagnosis && (
          <Box
            sx={{
              marginTop: 4,
              padding: 3,
              backgroundColor: '#f1f8e9',
              borderRadius: 2,
              textAlign: 'left',
            }}
          >
            <Typography variant="h6" sx={{ color: '#388e3c', marginBottom: 1 }}>
              Diagnosis Result:
            </Typography>
            <Typography sx={{ fontSize: '16px', color: '#2e7d32' }}>
              {diagnosis}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default AIDiagnosis;
