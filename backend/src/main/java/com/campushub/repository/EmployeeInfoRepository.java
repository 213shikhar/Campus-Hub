package com.campushub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.EmployeeInfo;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfo, Integer>{
	Optional<EmployeeInfo> findByEmployee_Eid(String eid);
	
//	✅ ADD THIS: Custom Delete Method
    @Transactional
    void deleteByEmployee_Eid(String eid);
}
