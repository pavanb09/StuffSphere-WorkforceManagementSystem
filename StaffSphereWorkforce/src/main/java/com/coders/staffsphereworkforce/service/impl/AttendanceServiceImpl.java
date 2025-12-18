package com.coders.staffsphereworkforce.service.impl;

import com.coders.staffsphereworkforce.dto.attendance.AttendanceResponse;
import com.coders.staffsphereworkforce.exception.DuplicateResourceException;
import com.coders.staffsphereworkforce.exception.ResourceNotFoundException;
import com.coders.staffsphereworkforce.model.Attendance;
import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.repository.AttendanceRepository;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import com.coders.staffsphereworkforce.security.SecurityUtil;
import com.coders.staffsphereworkforce.service.AttendanceService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceServiceImpl implements AttendanceService {

	private final AttendanceRepository attendanceRepository;
	private final EmployeeRepository employeeRepository;

	public AttendanceServiceImpl(AttendanceRepository attendanceRepository, EmployeeRepository employeeRepository) {
		this.attendanceRepository = attendanceRepository;
		this.employeeRepository = employeeRepository;
	}

	@Override
	public AttendanceResponse checkIn() {

		String email = SecurityUtil.getLoggedInEmail();

		Employee emp = employeeRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

		LocalDate today = LocalDate.now();

		if (attendanceRepository.findByEmployeeAndDate(emp, today).isPresent()) {
			throw new DuplicateResourceException("Already checked in today");
		}

		Attendance attendance = new Attendance();
		attendance.setEmployee(emp);
		attendance.setDate(today);
		attendance.setCheckIn(LocalDateTime.now());

		return mapToResponse(attendanceRepository.save(attendance));
	}

	@Override
	public AttendanceResponse checkOut() {

		String email = SecurityUtil.getLoggedInEmail();

		Employee emp = employeeRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

		Attendance attendance = attendanceRepository.findByEmployeeAndDate(emp, LocalDate.now())
				.orElseThrow(() -> new ResourceNotFoundException("No check-in found"));

		if (attendance.getCheckOut() != null) {
			throw new DuplicateResourceException("Already checked out");
		}

		LocalDateTime checkOutTime = LocalDateTime.now();
		attendance.setCheckOut(checkOutTime);

		double hours = Duration.between(attendance.getCheckIn(), checkOutTime).toMinutes() / 60.0;

		attendance.setTotalHours(hours);

		return mapToResponse(attendanceRepository.save(attendance));
	}

	@Override
	public List<AttendanceResponse> getAttendanceByEmployee() {

		String email = SecurityUtil.getLoggedInEmail();

		Employee emp = employeeRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

		return attendanceRepository.findByEmployee(emp).stream().map(this::mapToResponse).collect(Collectors.toList());
	}

	private AttendanceResponse mapToResponse(Attendance attendance) {
		AttendanceResponse res = new AttendanceResponse();
		res.setDate(attendance.getDate());
		res.setCheckIn(attendance.getCheckIn());
		res.setCheckOut(attendance.getCheckOut());
		res.setTotalHours(attendance.getTotalHours());
		return res;
	}
}
