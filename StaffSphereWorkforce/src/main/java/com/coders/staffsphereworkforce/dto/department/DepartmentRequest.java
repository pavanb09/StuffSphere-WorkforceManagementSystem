package com.coders.staffsphereworkforce.dto.department;

import jakarta.validation.constraints.NotBlank;

public class DepartmentRequest {

    @NotBlank
    private String name;

    private String description;

	public DepartmentRequest(@NotBlank String name, String description) {
		super();
		this.name = name;
		this.description = description;
	}

	public DepartmentRequest() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

    
    
    
}
