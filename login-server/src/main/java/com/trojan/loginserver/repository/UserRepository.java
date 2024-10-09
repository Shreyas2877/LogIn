// src/main/java/com/app/repository/UserRepository.java
package com.trojan.loginserver.repository;

import com.trojan.loginserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
