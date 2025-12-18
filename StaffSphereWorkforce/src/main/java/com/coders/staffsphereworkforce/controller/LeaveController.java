package com.coders.staffsphereworkforce.controller;

import com.coders.staffsphereworkforce.dto.leave.LeaveApplyRequest;
import com.coders.staffsphereworkforce.dto.leave.LeaveResponse;
import com.coders.staffsphereworkforce.response.ApiResponse;
import com.coders.staffsphereworkforce.service.LeaveService;
import jakarta.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    // EMPLOYEE
    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
    @PostMapping("/apply")
    public ApiResponse<LeaveResponse> applyLeave(
            @Valid @RequestBody LeaveApplyRequest request) {
        return new ApiResponse<>("Leave applied successfully",
                leaveService.applyLeave(request));
    }
    
    
    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/me")
    public ApiResponse<List<LeaveResponse>> getMyLeaves() {
        return new ApiResponse<>("My leaves fetched",
                leaveService.getLeavesForLoggedInEmployee());
    }

    // HR
    @PreAuthorize("hasRole('HR')")
    @GetMapping("/employee/{employeeId}")
    public ApiResponse<List<LeaveResponse>> getEmployeeLeavesForHR(
            @PathVariable Long employeeId) {
        return new ApiResponse<>("Employee leaves fetched",
                leaveService.getLeavesByEmployee(employeeId));
    }

    @PreAuthorize("hasRole('HR')")
    @GetMapping
    public ApiResponse<List<LeaveResponse>> getAllLeaves() {
        return new ApiResponse<>("All leave requests fetched",
                leaveService.getAllLeaves());
    }
    @PreAuthorize("hasRole('HR')")
    @PutMapping("/{leaveId}/approve")
    public ApiResponse<LeaveResponse> approveLeave(
            @PathVariable Long leaveId) {
        return new ApiResponse<>("Leave approved",
                leaveService.approveLeave(leaveId));
    }
    
    @PreAuthorize("hasRole('HR')")
    @PutMapping("/{leaveId}/reject")
    public ApiResponse<LeaveResponse> rejectLeave(
            @PathVariable Long leaveId) {
        return new ApiResponse<>("Leave rejected",
                leaveService.rejectLeave(leaveId));
    }
}
