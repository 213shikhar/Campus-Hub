package com.campushub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	// custom query
	Optional<Employee> findByTypeAndEidAndPassword(String type, String eid, String password);
	
	// ✅ ADD THIS: Needed for finding employee without password
    Optional<Employee> findByEid(String eid);
    
 // Add this method
    List<Employee> findByDepartment(String department);
    
    boolean existsByEid(String eid);
    
 // Add this if it's missing
    Optional<Employee> findByTypeAndEid(String type, String eid);
}
