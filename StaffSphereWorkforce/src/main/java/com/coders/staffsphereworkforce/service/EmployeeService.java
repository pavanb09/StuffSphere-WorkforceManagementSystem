package com.coders.staffsphereworkforce.service;

import com.coders.staffsphereworkforce.dto.employee.EmployeeCreateRequest;
import com.coders.staffsphereworkforce.dto.employee.EmployeeResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(EmployeeCreateRequest request);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployee(Long id, EmployeeCreateRequest request);

    void deleteEmployee(Long id);

    void uploadProfileImage(Long employeeId, MultipartFile file);
}
