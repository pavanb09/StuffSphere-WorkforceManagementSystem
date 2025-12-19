package com.coders.staffsphereworkforce.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "attendance_day",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"employee_id", "attendance_date"})
    }
)
public class AttendanceDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate attendanceDate;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @OneToMany(mappedBy = "attendanceDay", cascade = CascadeType.ALL)
    private List<AttendanceSession> sessions = new ArrayList<>();

	public AttendanceDay(Long id, LocalDate attendanceDate, Employee employee, List<AttendanceSession> sessions) {
		super();
		this.id = id;
		this.attendanceDate = attendanceDate;
		this.employee = employee;
		this.sessions = sessions;
	}

	public AttendanceDay() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getAttendanceDate() {
		return attendanceDate;
	}

	public void setAttendanceDate(LocalDate attendanceDate) {
		this.attendanceDate = attendanceDate;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public List<AttendanceSession> getSessions() {
		return sessions;
	}

	public void setSessions(List<AttendanceSession> sessions) {
		this.sessions = sessions;
	}
    
    
    
    
    
}
