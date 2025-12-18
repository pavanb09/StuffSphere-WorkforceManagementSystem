package com.coders.staffsphereworkforce.service;

import com.coders.staffsphereworkforce.dto.department.DepartmentRequest;
import com.coders.staffsphereworkforce.dto.department.DepartmentResponse;

import java.util.List;

public interface DepartmentService {

    DepartmentResponse createDepartment(DepartmentRequest request);

    List<DepartmentResponse> getAllDepartments();
}