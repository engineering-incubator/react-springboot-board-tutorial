package com.example.reactspringbootboardtutorial.authentication.repository;

import com.example.reactspringbootboardtutorial.authentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
