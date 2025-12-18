package com.coders.staffsphereworkforce.dto.auth;

public class LoginResponse {
	
	private String token;
	
	private String role;
	
	private Long employeeId;

	public LoginResponse(String token, String role, Long employeeId) {
		super();
		this.token = token;
		this.role = role;
		this.employeeId = employeeId;
	}

	public LoginResponse() {
		super();
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	
	

}
