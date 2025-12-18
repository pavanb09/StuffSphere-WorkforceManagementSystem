package com.coders.staffsphereworkforce.dto.employee;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class EmployeeCreateRequest {

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String role; // HR / EMPLOYEE

    @NotNull
    private LocalDate joiningDate;

    private Double salary;

    @NotNull
    private Long departmentId;  
    
	public EmployeeCreateRequest(@NotBlank String fullName, @Email @NotBlank String email, @NotBlank String password,
			@NotBlank String role, @NotNull LocalDate joiningDate, Double salary) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.joiningDate = joiningDate;
		this.salary = salary;
	}

	public EmployeeCreateRequest() {
		super();
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public LocalDate getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(LocalDate joiningDate) {
		this.joiningDate = joiningDate;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}
	
	public Long getDepartmentId() {
		return departmentId;
	}
	
	public void setDepartmentId(Long id) {
		this.departmentId = id;
	}

    
}
