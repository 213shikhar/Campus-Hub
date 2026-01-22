package com.campushub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	// custom query
	Optional<Employee> findByTypeAndEidAndPassword(String type, String eid, String password);
}
