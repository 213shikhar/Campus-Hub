package com.campushub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	// custom query
	Employee findByEidAndPassword(String eid, String password);
}
