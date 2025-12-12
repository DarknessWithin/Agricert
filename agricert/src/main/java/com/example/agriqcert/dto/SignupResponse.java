package com.example.agriqcert.dto;

public class SignupResponse {

    private Long id;
    private String username;
    private String email;
    private String role;

    public SignupResponse(Long id, String username, String email, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}
