package com.example.agriqcert.controllers;

import com.example.agriqcert.dto.LoginRequest;
import com.example.agriqcert.dto.LoginResponse;
import com.example.agriqcert.dto.SignupRequest;
import com.example.agriqcert.dto.SignupResponse;
import com.example.agriqcert.services.LoginService;
import com.example.agriqcert.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow frontend to call API
public class AuthController {

    private final UserService userService;

    private final LoginService loginService;

    public AuthController(UserService userService, LoginService loginService) {
        this.userService = userService;
        this.loginService = loginService;
    }
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request) {
        SignupResponse response = userService.registerUser(request);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = loginService.login(request);
        return ResponseEntity.ok(response);
    }
}
