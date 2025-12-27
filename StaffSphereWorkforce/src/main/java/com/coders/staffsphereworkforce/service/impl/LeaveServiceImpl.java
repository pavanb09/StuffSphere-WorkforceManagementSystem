package com.coders.staffsphereworkforce.service.impl;

import com.coders.staffsphereworkforce.dto.leave.LeaveApplyRequest;
import com.coders.staffsphereworkforce.dto.leave.LeaveResponse;
import com.coders.staffsphereworkforce.exception.BadRequestException;
import com.coders.staffsphereworkforce.exception.ResourceNotFoundException;
import com.coders.staffsphereworkforce.model.*;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import com.coders.staffsphereworkforce.repository.LeaveRequestRepository;
import com.coders.staffsphereworkforce.security.SecurityUtil;
import com.coders.staffsphereworkforce.service.EmailService;
import com.coders.staffsphereworkforce.service.LeaveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRequestRepository leaveRepository;
    private final EmployeeRepository employeeRepository;
    private final EmailService emailService;

    public LeaveServiceImpl(LeaveRequestRepository leaveRepository,
                            EmployeeRepository employeeRepository,EmailService emailService) {
        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
        this.emailService = emailService;
        
    }

    @Override
    public LeaveResponse applyLeave(LeaveApplyRequest request) {

        String email = SecurityUtil.getLoggedInEmail();

        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        LocalDate today = LocalDate.now();

        // ❌ startDate cannot be in the past
        if (request.getStartDate().isBefore(today)) {
            throw new BadRequestException("Start date must be today or a future date");
        }

        // ❌ endDate cannot be in the past
        if (request.getEndDate().isBefore(today)) {
            throw new BadRequestException("End date must be today or a future date");
        }

        // ❌ endDate cannot be before startDate
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new BadRequestException("End date cannot be before start date");
        }

        LeaveRequest leave = new LeaveRequest();
        leave.setEmployee(employee);
        leave.setType(LeaveType.valueOf(request.getType().toUpperCase()));
        leave.setStartDate(request.getStartDate());
        leave.setEndDate(request.getEndDate());
        leave.setReason(request.getReason());
        leave.setStatus(LeaveStatus.PENDING);

        return mapToResponse(leaveRepository.save(leave));
    }

    @Override
    public List<LeaveResponse> getLeavesByEmployee(Long employeeId) {

        Employee emp = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        return leaveRepository.findByEmployee(emp)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    

    @Override
    public List<LeaveResponse> getAllLeaves() {
        return leaveRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public LeaveResponse approveLeave(Long leaveId) {


        String approverEmail = SecurityUtil.getLoggedInEmail();

        Employee approver = employeeRepository.findByEmail(approverEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        // 🚫 Prevent self-approval
        if (leave.getEmployee().getId().equals(approver.getId())) {
            throw new BadRequestException("Self approval is not allowed");
        }

        leave.setStatus(LeaveStatus.APPROVED);
        emailService.sendEmail(
        	    leave.getEmployee().getEmail(),
        	    "Leave Approved",
        	    "Hello " + leave.getEmployee().getFullName() +
        	    "\n\nYour leave from " + leave.getStartDate() +
        	    " to " + leave.getEndDate() + " has been APPROVED." +
        	    "\n\nRegards,\nHR Team"
        	);

        return mapToResponse(leaveRepository.save(leave));
    }

    @Override
    public LeaveResponse rejectLeave(Long leaveId) {
    	String approverEmail = SecurityUtil.getLoggedInEmail();

        Employee approver = employeeRepository.findByEmail(approverEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));

        LeaveRequest leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        // 🚫 Prevent self-approval
        if (leave.getEmployee().getId().equals(approver.getId())) {
            throw new BadRequestException("Self approval is not allowed");
        }
        leave.setStatus(LeaveStatus.REJECTED);
        emailService.sendEmail(
        	    leave.getEmployee().getEmail(),
        	    "Leave Rejected",
        	    "Hello " + leave.getEmployee().getFullName() +
        	    "\n\nYour leave request has been REJECTED." +
        	    "\n\nRegards,\nHR Team"
        	);

        return mapToResponse(leaveRepository.save(leave));
    }

    private LeaveResponse mapToResponse(LeaveRequest leave) {
        LeaveResponse res = new LeaveResponse();
        res.setLeaveId(leave.getId());
        res.setEmployeeCode(leave.getEmployee().getEmployeeCode());
        res.setName(leave.getEmployee().getFullName());
        res.setLeaveType(leave.getType().name());
        res.setStartDate(leave.getStartDate());
        res.setEndDate(leave.getEndDate());
        res.setStatus(leave.getStatus().name());
        res.setReason(leave.getReason());
        return res;
    }

	@Override
	public List<LeaveResponse> getLeavesForLoggedInEmployee() {
	    String email = SecurityUtil.getLoggedInEmail();
	    Employee emp = employeeRepository.findByEmail(email)
	            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
	    return mapToResponseList(leaveRepository.findByEmployee(emp));
	}
	
	private List<LeaveResponse> mapToResponseList(List<LeaveRequest> leaves) {
	    return leaves.stream()
	            .map(this::mapToResponse)
	            .collect(Collectors.toList());
	}

}

