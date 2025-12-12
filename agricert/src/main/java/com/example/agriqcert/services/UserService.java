package com.example.agriqcert.services;

import com.example.agriqcert.dto.SignupRequest;
import com.example.agriqcert.dto.SignupResponse;

public interface UserService {
    SignupResponse registerUser(SignupRequest request);
}
