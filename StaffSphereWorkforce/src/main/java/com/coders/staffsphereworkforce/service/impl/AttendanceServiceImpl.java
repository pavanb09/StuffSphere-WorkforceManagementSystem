package com.coders.staffsphereworkforce.service.impl;

import com.coders.staffsphereworkforce.dto.attendance.AttendanceResponse;
import com.coders.staffsphereworkforce.dto.attendance.AttendanceSessionResponse;
import com.coders.staffsphereworkforce.dto.employee.EmployeeResponse;
import com.coders.staffsphereworkforce.exception.DuplicateResourceException;
import com.coders.staffsphereworkforce.exception.ResourceNotFoundException;

import com.coders.staffsphereworkforce.model.AttendanceDay;
import com.coders.staffsphereworkforce.model.AttendanceSession;
import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.repository.AttendanceDayRepository;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import com.coders.staffsphereworkforce.security.SecurityUtil;
import com.coders.staffsphereworkforce.service.AttendanceService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceDayRepository attendanceDayRepository;
    private final EmployeeRepository employeeRepository;
    
    public AttendanceServiceImpl(
            AttendanceDayRepository attendanceDayRepository,
            EmployeeRepository employeeRepository) {
        this.attendanceDayRepository = attendanceDayRepository;
        this.employeeRepository = employeeRepository;
    }
    
    @Override
    public List<AttendanceResponse> getAllAttendance() {
    	return attendanceDayRepository.findAll().stream()
    			.map(this::mapToResponse)
    			.collect(Collectors.toList());
    }

    @Override
    public AttendanceResponse checkIn() {

        Employee emp = getLoggedInEmployee();
        LocalDate today = LocalDate.now();

        AttendanceDay day = attendanceDayRepository
                .findByEmployeeAndAttendanceDate(emp, today)
                .orElseGet(() -> createAttendanceDay(emp, today));

        boolean hasOpenSession = day.getSessions().stream()
                .anyMatch(s -> s.getCheckOutTime() == null);

        if (hasOpenSession) {
            throw new DuplicateResourceException("Already checked in (active session exists)");
        }

        AttendanceSession session = new AttendanceSession();
        session.setCheckInTime(LocalTime.now());
        session.setAttendanceDay(day);

        day.getSessions().add(session);

        attendanceDayRepository.save(day);

        return mapToResponse(day);
    }

    @Override
    public AttendanceResponse checkOut() {

        Employee emp = getLoggedInEmployee();
        LocalDate today = LocalDate.now();

        AttendanceDay day = attendanceDayRepository
                .findByEmployeeAndAttendanceDate(emp, today)
                .orElseThrow(() -> new ResourceNotFoundException("No check-in found"));

        AttendanceSession openSession = day.getSessions().stream()
                .filter(s -> s.getCheckOutTime() == null)
                .findFirst()
                .orElseThrow(() -> new DuplicateResourceException("No active check-in"));

        openSession.setCheckOutTime(LocalTime.now());

        attendanceDayRepository.save(day);

        return mapToResponse(day);
    }

    @Override
    public List<AttendanceResponse> getAttendanceByEmployee() {

        Employee emp = getLoggedInEmployee();

        return attendanceDayRepository.findByEmployee(emp).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    
    @Override
    public List<AttendanceResponse> getAttendanceById( Long id) {
    	Employee emp = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee id is not found"));

        return attendanceDayRepository.findByEmployee(emp).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    

    // ================= HELPER METHODS =================

    private Employee getLoggedInEmployee() {
        String email = SecurityUtil.getLoggedInEmail();
        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }

    private AttendanceDay createAttendanceDay(Employee emp, LocalDate date) {
        AttendanceDay day = new AttendanceDay();
        day.setEmployee(emp);
        day.setAttendanceDate(date);
        return attendanceDayRepository.save(day);
    }

    private AttendanceResponse mapToResponse(AttendanceDay day) {

        AttendanceResponse response = new AttendanceResponse();
        response.setDate(day.getAttendanceDate());
        response.setEmployee(maptoEmployeeResponse(day.getEmployee()));

        List<AttendanceSessionResponse> sessions =
                day.getSessions().stream().map(s -> {

                    AttendanceSessionResponse sr = new AttendanceSessionResponse();

                    sr.setCheckIn(
                            LocalDateTime.of(day.getAttendanceDate(), s.getCheckInTime())
                    );

                    if (s.getCheckOutTime() != null) {
                        sr.setCheckOut(
                                LocalDateTime.of(day.getAttendanceDate(), s.getCheckOutTime())
                        );
                    }

                    return sr;
                }).toList();

        response.setSessions(sessions);
        response.setTotalHours(calculateTotalHours(day));

        return response;
    }
    

    
    private EmployeeResponse maptoEmployeeResponse(Employee emp) {
    	EmployeeResponse res = new EmployeeResponse();
        res.setId(emp.getId());
        res.setEmployeeCode(emp.getEmployeeCode());
        res.setFullName(emp.getFullName());
        res.setEmail(emp.getEmail());
        res.setRole(emp.getRole().name());
        res.setJoiningDate(emp.getJoiningDate());
        res.setSalary(emp.getSalary());
        res.setProfileImage(emp.getProfileImage());
        res.setDepartment(emp.getDepartment().getName());
        return res;
    }

    private Double calculateTotalHours(AttendanceDay day) {

        double totalMinutes = 0;

        for (AttendanceSession s : day.getSessions()) {
            if (s.getCheckOutTime() != null) {
                totalMinutes += Duration
                        .between(s.getCheckInTime(), s.getCheckOutTime())
                        .toMinutes();
            }
        }

        return Math.round((totalMinutes / 60.0) * 100.0) / 100.0;
    }

}
