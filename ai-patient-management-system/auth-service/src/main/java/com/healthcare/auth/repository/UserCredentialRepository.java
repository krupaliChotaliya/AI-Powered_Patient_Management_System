package com.healthcare.auth.repository;

import com.healthcare.auth.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserCredentialRepository  extends JpaRepository<UserCredential,Integer> {
    Optional<UserCredential> findByName(String username);

    List<UserCredential> findByRoleAndSpecialization(String role, String specialization);

    UserCredential findById(int id);
}
