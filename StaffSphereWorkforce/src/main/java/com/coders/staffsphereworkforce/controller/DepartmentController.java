package com.coders.staffsphereworkforce.controller;

import com.coders.staffsphereworkforce.dto.department.DepartmentRequest;
import com.coders.staffsphereworkforce.dto.department.DepartmentResponse;
import com.coders.staffsphereworkforce.response.ApiResponse;
import com.coders.staffsphereworkforce.service.DepartmentService;
import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PreAuthorize("hasAnyRole('HR')")
    @PostMapping
    public ApiResponse<DepartmentResponse> createDepartment(
            @Valid @RequestBody DepartmentRequest request) {

        return new ApiResponse<>("Department created successfully",
                departmentService.createDepartment(request));
    }

    @PreAuthorize("hasAnyRole('HR')")
    @GetMapping
    public ApiResponse<List<DepartmentResponse>> getAllDepartments() {
    	
        return new ApiResponse<>("Departments fetched",
                departmentService.getAllDepartments());
    }
}
