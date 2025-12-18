package com.coders.staffsphereworkforce.controller;

import com.coders.staffsphereworkforce.dto.attendance.AttendanceResponse;
import com.coders.staffsphereworkforce.response.ApiResponse;
import com.coders.staffsphereworkforce.service.AttendanceService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
    @PostMapping("/check-in")
    public ApiResponse<AttendanceResponse> checkIn() {
        return new ApiResponse<>("Check-in recorded",
                attendanceService.checkIn());
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
    @PostMapping("/check-out")
    public ApiResponse<AttendanceResponse> checkOut() {
        return new ApiResponse<>("Check-out recorded",
                attendanceService.checkOut());
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','HR')")
    @GetMapping("/me")
    public ApiResponse<List<AttendanceResponse>> getMyAttendance() {
        return new ApiResponse<>("Attendance fetched",
                attendanceService.getAttendanceByEmployee());
    }
}

