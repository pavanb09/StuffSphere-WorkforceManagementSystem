package com.coders.staffsphereworkforce.dto.employee;

import java.time.LocalDate;

public class EmployeeResponse {

    private Long id;
    private String employeeCode;
    private String fullName;
    private String email;
    private String role;
    private LocalDate joiningDate;
    private Double salary;
    private String department;
    private String profileImage;
    
    
	public EmployeeResponse() {
		super();
	}


	public EmployeeResponse(Long id, String employeeCode, String fullName, String email, String role,
			LocalDate joiningDate, Double salary, String profileImage) {
		super();
		this.id = id;
		this.employeeCode = employeeCode;
		this.fullName = fullName;
		this.email = email;
		this.role = role;
		this.joiningDate = joiningDate;
		this.salary = salary;
		this.profileImage = profileImage;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getEmployeeCode() {
		return employeeCode;
	}


	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
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


	public String getProfileImage() {
		return profileImage;
	}


	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}


	public String getDepartment() {
		return department;
	}


	public void setDepartment(String department) {
		this.department = department;
	}


	public EmployeeResponse(Long id, String employeeCode, String fullName, String email, String role,
			LocalDate joiningDate, Double salary, String department, String profileImage) {
		super();
		this.id = id;
		this.employeeCode = employeeCode;
		this.fullName = fullName;
		this.email = email;
		this.role = role;
		this.joiningDate = joiningDate;
		this.salary = salary;
		this.department = department;
		this.profileImage = profileImage;
	}
    
    

    // getters & setters
	
}
