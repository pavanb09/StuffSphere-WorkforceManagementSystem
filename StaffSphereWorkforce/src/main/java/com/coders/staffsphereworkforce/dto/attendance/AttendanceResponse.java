package com.coders.staffsphereworkforce.dto.attendance;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class AttendanceResponse {

	 private LocalDate date;
	    private List<AttendanceSessionResponse> sessions;
	    private Double totalHours;
		public AttendanceResponse(LocalDate date, List<AttendanceSessionResponse> sessions, Double totalHours) {
			super();
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

	    
}
