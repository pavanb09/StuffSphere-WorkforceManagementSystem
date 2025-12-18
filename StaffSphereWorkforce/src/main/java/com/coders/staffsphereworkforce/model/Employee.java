package com.coders.staffsphereworkforce.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // technical PK

    @Column(name = "employee_code", unique = true)
    private String employeeCode; // EMP001, EMP002

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // HR / EMPLOYEE
    
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;


    private LocalDate joiningDate;

    private Double salary;

    @Column(name = "profile_image")
    private String profileImage; // image URL/path

	public Employee(Long id, String employeeCode, String fullName, String email, String password, Role role,
			LocalDate joiningDate, Double salary, String profileImage) {
		super();
		this.id = id;
		this.employeeCode = employeeCode;
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.joiningDate = joiningDate;
		this.salary = salary;
		this.profileImage = profileImage;
	}

	public Employee() {
		super();
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
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

	public Department getDepartment() {
		return this.department;
	}
	
	public void setDepartment(Department department) {
		this.department = department;
	}
	
    
}
