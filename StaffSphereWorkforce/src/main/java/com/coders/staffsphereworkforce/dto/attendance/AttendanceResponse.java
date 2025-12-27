package com.coders.staffsphereworkforce.dto.attendance;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.coders.staffsphereworkforce.dto.employee.EmployeeResponse;
import com.coders.staffsphereworkforce.model.Employee;

public class AttendanceResponse {

	private EmployeeResponse employee;
	 private LocalDate date;
	    private List<AttendanceSessionResponse> sessions;
	    private Double totalHours;
		public AttendanceResponse(EmployeeResponse employeeId,LocalDate date, List<AttendanceSessionResponse> sessions, Double totalHours) {
			super();
			this.employee = employeeId;
			this.date = date;
			this.sessions = sessions;
			this.totalHours = totalHours;
		}
		public AttendanceResponse() {
			super();
		}
		public LocalDate getDate() {
			return date;
		}
		public void setDate(LocalDate date) {
			this.date = date;
		}
		public List<AttendanceSessionResponse> getSessions() {
			return sessions;
		}
		public void setSessions(List<AttendanceSessionResponse> sessions) {
			this.sessions = sessions;
		}
		public Double getTotalHours() {
			return totalHours;
		}
		public void setTotalHours(Double totalHours) {
			this.totalHours = totalHours;
		}
		public EmployeeResponse getEmployee() {
			return employee;
		}
		public void setEmployee(EmployeeResponse employeeId) {
			this.employee = employeeId;
		}
		
		

	    
}
