package com.coders.staffsphereworkforce.repository;

import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployee(Employee employee);
}
