package com.coders.staffsphereworkforce.service.impl;

import com.coders.staffsphereworkforce.dto.employee.EmployeeCreateRequest;
import com.coders.staffsphereworkforce.dto.employee.EmployeeResponse;
import com.coders.staffsphereworkforce.exception.BadRequestException;
import com.coders.staffsphereworkforce.exception.DuplicateResourceException;
import com.coders.staffsphereworkforce.exception.ResourceNotFoundException;
import com.coders.staffsphereworkforce.model.Department;
import com.coders.staffsphereworkforce.model.Designation;
import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.model.Role;
import com.coders.staffsphereworkforce.repository.DepartmentRepository;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import com.coders.staffsphereworkforce.service.CloudinaryService;
import com.coders.staffsphereworkforce.service.EmailService;
import com.coders.staffsphereworkforce.service.EmployeeService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmailService emailService;
    private final CloudinaryService cloudinaryService;
    
    @Autowired
    private PasswordEncoder encoder;


    public EmployeeServiceImpl(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository,
            EmailService emailService,
            CloudinaryService cloudinaryService
    ) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.emailService = emailService;
        this.cloudinaryService = cloudinaryService;
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
        emp.setDesignation(Designation.valueOf(request.getDesignation()));
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
        	    "- Role: " + emp.getDesignation() + "\n\n" +
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
    public EmployeeResponse getEmployeeByEmail(String email) {
    	Employee emp = employeeRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("Employee not found"));
    	return mapToResponse(emp);
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeCreateRequest request) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        emp.setFullName(request.getFullName());
        emp.setDesignation(Designation.valueOf(request.getDesignation()));
        emp.setSalary(request.getSalary());

        return mapToResponse(employeeRepository.save(emp));
    }
    
    @Override
    public EmployeeResponse updateProfile(String email, String fullName) {
    	Employee emp = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        emp.setFullName(fullName);

        return mapToResponse(employeeRepository.save(emp));
    	
    }
    
    @Override
	public void changePassword(String email, String currentPassword, String newPassword) {
    	Employee emp = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        // 🔐 Verify current password
        if (!encoder.matches(currentPassword, emp.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }

        emp.setPassword(encoder.encode(newPassword));
        employeeRepository.save(emp);
		
	}

    @Override
    public void deleteEmployee(Long id) {
    	Employee employee = employeeRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Employee not Found"));
        employeeRepository.deleteById(id);
    }

    @Override
    public void uploadProfileImage(String email, MultipartFile file) {

        Employee emp = employeeRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        String imageUrl = cloudinaryService.uploadImage(file);

        emp.setProfileImage(imageUrl);
        employeeRepository.save(emp);
    }



    private EmployeeResponse mapToResponse(Employee emp) {
        EmployeeResponse res = new EmployeeResponse();
        res.setId(emp.getId());
        res.setEmployeeCode(emp.getEmployeeCode());
        res.setFullName(emp.getFullName());
        res.setEmail(emp.getEmail());
        res.setRole(emp.getRole().name());
        res.setDesignation(emp.getDesignation().name());
        res.setJoiningDate(emp.getJoiningDate());
        res.setSalary(emp.getSalary());
        res.setProfileImage(emp.getProfileImage());
        res.setDepartment(emp.getDepartment().getName());
        return res;
    }

    @Override
    public void uploadProfileImage(Long employeeId, MultipartFile file) {

        Employee emp = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        String imageUrl = cloudinaryService.uploadImage(file);

        emp.setProfileImage(imageUrl);
        employeeRepository.save(emp);
    }



	
}
