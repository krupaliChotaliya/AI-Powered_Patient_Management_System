package com.healthcare.doctor.services;

import com.healthcare.doctor.models.Doctor;
import com.healthcare.doctor.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> searchDoctors(String specialty, String location, String availableTime) {
        if (availableTime != null) {
            return doctorRepository.findBySpecialtyAndLocationAndAvailableTime(specialty, location, availableTime);
        }
        return doctorRepository.findBySpecialtyAndLocation(specialty, location);
    }
}
