package com.coders.staffsphereworkforce.dto.leave;

import java.time.LocalDate;

public class LeaveResponse {

	private Long leaveId;
	private String employeeCode;
	private String leaveType;
	private LocalDate startDate;
	private LocalDate endDate;
	private String status;
	private String reason;

	public LeaveResponse(Long leaveId, String employeeCode, String leaveType, LocalDate startDate, LocalDate endDate,
			String status, String reason) {
		super();
		this.leaveId = leaveId;
		this.employeeCode = employeeCode;
		this.leaveType = leaveType;
		this.startDate = startDate;
		this.endDate = endDate;
		this.status = status;
		this.reason = reason;
	}

	public LeaveResponse() {
		super();
	}

	public Long getLeaveId() {
		return leaveId;
	}

	public void setLeaveId(Long leaveId) {
		this.leaveId = leaveId;
	}

	public String getEmployeeCode() {
		return employeeCode;
	}

	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}

	public String getLeaveType() {
		return leaveType;
	}

	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	// getters & setters

}
