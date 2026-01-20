package com.campushub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campushub.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {}
