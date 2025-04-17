package com.healthcare.auth.service;


import com.healthcare.auth.entity.UserCredential;
import com.healthcare.auth.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository repository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public String saveUser(UserCredential credential) {
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        repository.save(credential);
        return "user added to the system";
    }
    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }
    public void validateToken(String token) {
        jwtService.validateToken(token);
    }
    public UserCredential getUserById(int id) {
        return repository.findById(id);
    }
    public UserCredential getUserByUsername(String username) {
        return repository.findByName(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }
}
