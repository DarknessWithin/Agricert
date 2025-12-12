package com.example.agriqcert.dto;

public class LoginResponse {
    private Long userId;
    private String username;
    private String email;
    private String role;
    private String message;

    public LoginResponse(Long userId, String username, String email, String role, String message) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.message = message;
    }

    // getters only
    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getMessage() { return message; }
}
