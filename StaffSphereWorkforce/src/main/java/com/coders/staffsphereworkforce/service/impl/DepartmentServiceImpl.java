package com.coders.staffsphereworkforce.service.impl;

import com.coders.staffsphereworkforce.dto.department.DepartmentRequest;
import com.coders.staffsphereworkforce.dto.department.DepartmentResponse;
import com.coders.staffsphereworkforce.exception.DuplicateResourceException;
import com.coders.staffsphereworkforce.model.Department;
import com.coders.staffsphereworkforce.repository.DepartmentRepository;
import com.coders.staffsphereworkforce.service.DepartmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public DepartmentResponse createDepartment(DepartmentRequest request) {

        if (departmentRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Department already exists");
        }

        Department dept = new Department();
        dept.setName(request.getName());
        dept.setDescription(request.getDescription());

        return mapToResponse(departmentRepository.save(dept));
    }

    @Override
    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private DepartmentResponse mapToResponse(Department dept) {
        DepartmentResponse res = new DepartmentResponse();
        res.setId(dept.getId());
        res.setName(dept.getName());
        res.setDescription(dept.getDescription());
        return res;
    }
}
