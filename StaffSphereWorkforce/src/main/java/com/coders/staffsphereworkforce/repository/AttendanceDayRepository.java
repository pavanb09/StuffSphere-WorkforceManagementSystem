package com.coders.staffsphereworkforce.repository;

import com.coders.staffsphereworkforce.model.AttendanceDay;
import com.coders.staffsphereworkforce.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceDayRepository extends JpaRepository<AttendanceDay, Long> {

	Optional<AttendanceDay> findByEmployeeAndAttendanceDate(
            Employee employee,
            LocalDate attendanceDate
    );
	
	List<AttendanceDay> findByEmployee(Employee employee);
}
