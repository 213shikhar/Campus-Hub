package com.campushub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.AdminUser;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUser, Integer> {
    // Find by UserID and Role (to ensure a TPO can't login as Registrar)
    Optional<AdminUser> findByUserIdAndRole(String userId, String role);
}
