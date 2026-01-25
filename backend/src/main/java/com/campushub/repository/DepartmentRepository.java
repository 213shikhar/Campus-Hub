package com.campushub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.Department;

//DepartmentRepository.java
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {}

