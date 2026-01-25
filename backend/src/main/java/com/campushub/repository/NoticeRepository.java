package com.campushub.repository;

import com.campushub.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // Optional: If you ever want to fetch notices specific to a role
    List<Notice> findByUploaderRole(String role);
}