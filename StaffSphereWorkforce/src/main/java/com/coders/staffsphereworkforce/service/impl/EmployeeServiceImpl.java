package com.coders.staffsphereworkforce.service.impl;

import com.coders.staffsphereworkforce.dto.employee.EmployeeCreateRequest;
import com.coders.staffsphereworkforce.dto.employee.EmployeeResponse;
import com.coders.staffsphereworkforce.exception.DuplicateResourceException;
import com.coders.staffsphereworkforce.exception.FileStorageException;
import com.coders.staffsphereworkforce.exception.ResourceNotFoundException;
import com.coders.staffsphereworkforce.model.Department;
import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.model.Role;
import com.coders.staffsphereworkforce.repository.DepartmentRepository;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import com.coders.staffsphereworkforce.service.EmailService;
import com.coders.staffsphereworkforce.service.EmployeeService;
import com.coders.staffsphereworkforce.util.FileStorageUtil;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmailService emailService;
    
    @Autowired
    private PasswordEncoder encoder;

    @Value("${staffsphere.upload.dir}")
    private String uploadDir;
    

    public EmployeeServiceImpl(EmployeeRepository employeeRepository,DepartmentRepository departmentRepository,EmailService emailService) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.emailService = emailService;
    }

    @Override
    public EmployeeResponse createEmployee(EmployeeCreateRequest request) {

        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists");
        }

        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        Employee emp = new Employee();
        emp.setFullName(request.getFullName());
        emp.setEmail(request.getEmail());
        emp.setPassword(encoder.encode(request.getPassword()));
        emp.setRole(Role.valueOf(request.getRole()));
        emp.setJoiningDate(request.getJoiningDate());
        emp.setSalary(request.getSalary());

        // ✅ THIS LINE WAS MISSING
        emp.setDepartment(department);

        Employee saved = employeeRepository.save(emp);

        String code = "EMP" + String.format("%03d", saved.getId());
        saved.setEmployeeCode(code);

        employeeRepository.save(saved);
        
        emailService.sendEmail(
        	    emp.getEmail(),
        	    "Welcome to StaffSphere – Your Employee Account Is Ready",
        	    "Dear " + emp.getFullName() + ",\n\n" +
        	    "Welcome to StaffSphere!\n\n" +
        	    "We are pleased to inform you that your employee account has been successfully created in our workforce management system.\n\n" +
        	    "Account Details:\n" +
        	    "- Official Email: " + emp.getEmail() + "\n" +
        	    "- Role: " + emp.getRole() + "\n\n" +
        	    "You can now log in to StaffSphere to:\n" +
        	    "• View and update your profile\n" +
        	    "• Mark daily attendance\n" +
        	    "• Apply for leaves and track their status\n\n" +
        	    "For security reasons, we recommend changing your password after your first login.\n\n" +
        	    "If you have any questions, please reach out to the HR team.\n\n" +
        	    "We wish you a successful and rewarding journey with us.\n\n" +
        	    "Best regards,\n" +
        	    "HR Team\n" +
        	    "StaffSphere Workforce Platform"
        	);

        return mapToResponse(saved);
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
        return mapToResponse(emp);
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeCreateRequest request) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        emp.setFullName(request.getFullName());
        emp.setEmail(request.getEmail());
        emp.setSalary(request.getSalary());

        return mapToResponse(employeeRepository.save(emp));
    }

    @Override
    public void deleteEmployee(Long id) {
    	Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee not Found"));
        employeeRepository.deleteById(id);
    }

    @Override
    public void uploadProfileImage(Long employeeId, MultipartFile file) {

        Employee emp = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        try {
            String imagePath = FileStorageUtil.saveFile(uploadDir, file);
            emp.setProfileImage(imagePath);
            employeeRepository.save(emp);
        } catch (IOException e) {
            throw new FileStorageException("Image upload failed",e);
        }
    }

    private EmployeeResponse mapToResponse(Employee emp) {
        EmployeeResponse res = new EmployeeResponse();
        res.setId(emp.getId());
        res.setEmployeeCode(emp.getEmployeeCode());
        res.setFullName(emp.getFullName());
        res.setEmail(emp.getEmail());
        res.setRole(emp.getRole().name());
        res.setJoiningDate(emp.getJoiningDate());
        res.setSalary(emp.getSalary());
        res.setProfileImage(emp.getProfileImage());
        res.setDepartment(emp.getDepartment().getName());
        return res;
    }
}
