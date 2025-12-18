package com.coders.staffsphereworkforce.service;

import com.coders.staffsphereworkforce.dto.leave.LeaveApplyRequest;
import com.coders.staffsphereworkforce.dto.leave.LeaveResponse;

import java.util.List;

public interface LeaveService {

    LeaveResponse applyLeave(LeaveApplyRequest request);

    List<LeaveResponse> getLeavesByEmployee(Long employeeId);

    List<LeaveResponse> getAllLeaves(); // HR

    LeaveResponse approveLeave(Long leaveId);

    LeaveResponse rejectLeave(Long leaveId);

    List<LeaveResponse> getLeavesForLoggedInEmployee();
}
