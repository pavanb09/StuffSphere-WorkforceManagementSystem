package com.coders.staffsphereworkforce.config;


import com.coders.staffsphereworkforce.model.Department;
import com.coders.staffsphereworkforce.model.Designation;
import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.model.Role;
import com.coders.staffsphereworkforce.repository.DepartmentRepository;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(
            EmployeeRepository employeeRepository,
            PasswordEncoder encoder,
            DepartmentRepository departmentRepository
    ) {
        return args -> {

            boolean hrExists = employeeRepository.existsByRole(Role.HR);

            if (!hrExists) {
                Employee hr = new Employee();
                hr.setFullName("admin");
                hr.setEmail("admin@gmail.com");
                hr.setPassword(encoder.encode("admin123"));
                hr.setRole(Role.HR);
                hr.setDesignation(Designation.HR_EXECUTIVE);
                hr.setJoiningDate(LocalDate.now());
                hr.setSalary(0.0);
                Department adminDept = departmentRepository
                	    .findByName("Administration")
                	    .orElseGet(() -> {
                	        Department d = new Department();
                	        d.setName("Administration");
                	        d.setDescription("Administration");
                	        return departmentRepository.save(d);
                	    });

                	hr.setDepartment(adminDept);


                employeeRepository.save(hr);

                hr.setEmployeeCode("EMP001");
                employeeRepository.save(hr);

                System.out.println("✅ Default HR account created");
                System.out.println("📧 Email: hr@staffsphere.com");
                System.out.println("🔑 Password: Hr@123");
            }
        };
    }
}
