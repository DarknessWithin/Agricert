package com.example.agriqcert.repositories;

import com.example.agriqcert.models.AgriUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<AgriUser,Integer> {
    Optional<AgriUser> findByUsername(String username);
    Optional<AgriUser> findByEmail(String email);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
