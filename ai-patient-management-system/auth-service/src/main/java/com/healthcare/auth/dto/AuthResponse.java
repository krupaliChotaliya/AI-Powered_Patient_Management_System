package com.healthcare.auth.dto;

public class AuthResponse {
    private String token;
    private int id;
    private String role;

    public AuthResponse(String token, int id, String role) {
        this.token = token;
        this.id = id;
        this.role = role;
    }

    // Getters and Setters (or use Lombok @Data if preferred)

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
