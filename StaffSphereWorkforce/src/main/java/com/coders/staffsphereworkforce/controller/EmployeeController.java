package com.coders.staffsphereworkforce.controller;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.coders.staffsphereworkforce.dto.employee.ChangePasswordRequest;
import com.coders.staffsphereworkforce.dto.employee.EmployeeCreateRequest;
import com.coders.staffsphereworkforce.dto.employee.EmployeeResponse;
import com.coders.staffsphereworkforce.response.ApiResponse;
import com.coders.staffsphereworkforce.security.SecurityUtil;
import com.coders.staffsphereworkforce.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PreAuthorize("hasAnyRole('HR')")
    @PostMapping
    public ApiResponse<EmployeeResponse> createEmployee(
            @Valid @RequestBody EmployeeCreateRequest request) {
        return new ApiResponse<>("Employee created successfully",
                employeeService.createEmployee(request));
    }

    @PreAuthorize("hasAnyRole('HR')")
    @GetMapping
    public ApiResponse<List<EmployeeResponse>> getAllEmployees() {
        return new ApiResponse<>("Employees fetched",
                employeeService.getAllEmployees());
    }
    @PreAuthorize("hasAnyRole('HR')")
    @GetMapping("/{id}")
    public ApiResponse<EmployeeResponse> getEmployee(@PathVariable Long id) {
        return new ApiResponse<>("Employee fetched",
                employeeService.getEmployeeById(id));
    }
    
    @PreAuthorize("hasAnyRole('HR','EMPLOYEE')")
    @GetMapping("/me")
    public ApiResponse<EmployeeResponse> getEmployee(){
    	String email = SecurityUtil.getLoggedInEmail();
    	return new ApiResponse<>("Employee fetched",
                employeeService.getEmployeeByEmail(email));
    	
    }

    @PreAuthorize("hasAnyRole('HR')")
    @PutMapping("/{id}")
    public ApiResponse<EmployeeResponse> updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeCreateRequest request) {
        return new ApiResponse<>("Employee updated",
                employeeService.updateEmployee(id, request));
    }

    @PreAuthorize("hasAnyRole('HR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAnyRole('HR','EMPLOYEE')")
    @PutMapping("/profile/image")
    public ApiResponse<String> uploadOwnProfileImage(
            @RequestParam("file") MultipartFile file) {

        String email = SecurityUtil.getLoggedInEmail();

        employeeService.uploadProfileImage(email, file);

        return new ApiResponse<>("Profile image uploaded", null);
    }
    
    @PreAuthorize("hasRole('HR')")
    @PutMapping("/hr/profile/image/{employeeId}")
    public ApiResponse<String> uploadEmployeeProfileImage(
            @PathVariable Long employeeId,
            @RequestParam("file") MultipartFile file) {

        employeeService.uploadProfileImage(employeeId, file);

        return new ApiResponse<>("Employee profile image uploaded", null);
    }
    
    @PreAuthorize("hasAnyRole('HR','EMPLOYEE')")
    @PutMapping("/profile/change-password")
    public ApiResponse<?> changePassword(
            @RequestBody ChangePasswordRequest request) {

        String email = SecurityUtil.getLoggedInEmail();

        employeeService.changePassword(
            email,
            request.getCurrentPassword(),
            request.getNewPassword()
        );

        return new ApiResponse<>("Password updated successfully", null);
    }

    
    @PreAuthorize("hasAnyRole('EMPLOYEE')")
    @PutMapping("/profile")
    public ApiResponse<EmployeeResponse> updateProfile(
            @RequestParam String fullName) {

        String email = SecurityUtil.getLoggedInEmail();


        return new ApiResponse<>("Profile updated successfully",employeeService.updateProfile(email, fullName));
    }


}
