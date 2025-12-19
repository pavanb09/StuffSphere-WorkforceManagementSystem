package com.coders.staffsphereworkforce.model;

import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "attendance_session")
public class AttendanceSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalTime checkInTime;

    private LocalTime checkOutTime;

    @ManyToOne
    @JoinColumn(name = "attendance_day_id", nullable = false)
    private AttendanceDay attendanceDay;

	public AttendanceSession() {
		super();
	}

	public AttendanceSession(Long id, LocalTime checkInTime, LocalTime checkOutTime, AttendanceDay attendanceDay) {
		super();
		this.id = id;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.attendanceDay = attendanceDay;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalTime getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(LocalTime checkInTime) {
		this.checkInTime = checkInTime;
	}

	public LocalTime getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(LocalTime checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public AttendanceDay getAttendanceDay() {
		return attendanceDay;
	}

	public void setAttendanceDay(AttendanceDay attendanceDay) {
		this.attendanceDay = attendanceDay;
	}
    
    
    
}