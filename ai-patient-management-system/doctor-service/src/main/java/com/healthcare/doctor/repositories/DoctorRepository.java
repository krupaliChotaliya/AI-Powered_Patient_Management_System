package com.healthcare.doctor.repositories;

import com.healthcare.doctor.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecialtyAndLocationAndAvailableTime(
            String specialty, String location, String availableTime);
    List<Doctor> findBySpecialtyAndLocation(String specialty, String location);
}
