package com.coders.staffsphereworkforce.dto.attendance;

import java.time.LocalDateTime;

public class AttendanceSessionResponse {

	private LocalDateTime checkIn;
	private LocalDateTime checkOut;

	public AttendanceSessionResponse(LocalDateTime checkIn, LocalDateTime checkOut) {
		super();
		this.checkIn = checkIn;
		this.checkOut = checkOut;
	}

	public AttendanceSessionResponse() {
		super();
	}

	public LocalDateTime getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(LocalDateTime checkIn) {
		this.checkIn = checkIn;
	}

	public LocalDateTime getCheckOut() {
		return checkOut;
	}

	public void setCheckOut(LocalDateTime checkOut) {
		this.checkOut = checkOut;
	}

}
