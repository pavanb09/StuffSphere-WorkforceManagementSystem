package com.coders.staffsphereworkforce.repository;

import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    boolean existsByEmail(String email);

	Optional<Employee> findByEmployeeCode(String employeeId);
	
	boolean existsByRole(Role role);

}
