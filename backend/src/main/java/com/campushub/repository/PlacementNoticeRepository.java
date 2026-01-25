package com.campushub.repository;

import com.campushub.model.PlacementNotice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementNoticeRepository extends JpaRepository<PlacementNotice, Long> {
}