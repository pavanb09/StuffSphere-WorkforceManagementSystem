package com.coders.staffsphereworkforce.repository;

import com.coders.staffsphereworkforce.model.Department;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    boolean existsByName(String name);

	Optional<Department> findByName(String string);
}
