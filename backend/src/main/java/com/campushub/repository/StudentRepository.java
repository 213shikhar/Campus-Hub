package com.campushub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campushub.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer>{

}
