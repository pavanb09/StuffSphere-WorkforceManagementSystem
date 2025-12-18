package com.coders.staffsphereworkforce.dto.attendance;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AttendanceResponse {

	private LocalDate date;
	private LocalDateTime checkIn;
	private LocalDateTime checkOut;
	private Double totalHours;

	public AttendanceResponse(LocalDate date, LocalDateTime checkIn, LocalDateTime checkOut, Double totalHours) {
		super();
		this.date = date;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
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

	public Double getTotalHours() {
		return totalHours;
	}

	public void setTotalHours(Double totalHours) {
		this.totalHours = totalHours;
	}

	// getters & setters
}
