package com.healthcare.auth.service;

import com.healthcare.auth.entity.UserCredential;
import com.healthcare.auth.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorInfoService {

    @Autowired
    private UserCredentialRepository repository;

    public List<UserCredential> getDoctorsBySpecialization(String specialization) {
        return repository.findByRoleAndSpecialization("DOCTOR", specialization);
    }
}
