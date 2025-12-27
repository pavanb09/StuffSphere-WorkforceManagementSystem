package com.coders.staffsphereworkforce.service;

import com.coders.staffsphereworkforce.dto.attendance.AttendanceResponse;

import java.util.List;

public interface AttendanceService {

    AttendanceResponse checkIn();

    AttendanceResponse checkOut();

    List<AttendanceResponse> getAttendanceByEmployee();
    
    List<AttendanceResponse> getAllAttendance();
    
    List<AttendanceResponse> getAttendanceById(Long id);
}

