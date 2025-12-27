package com.coders.staffsphereworkforce.service.impl;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.coders.staffsphereworkforce.exception.BadRequestException;
import com.coders.staffsphereworkforce.exception.ResourceNotFoundException;
import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import com.coders.staffsphereworkforce.service.AuthService;
import com.coders.staffsphereworkforce.service.EmailService;
import com.coders.staffsphereworkforce.util.OtpUtil;
@Service
public class AuthServiceImpl implements AuthService {
	

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthServiceImpl(EmployeeRepository employeeRepository,
                           PasswordEncoder passwordEncoder,
                           EmailService emailService) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Override
    public void forgotPassword(String email) {

        Employee emp = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email id not found"));

        String otp = OtpUtil.generateOtp();

        emp.setOtp(otp);
        emp.setOtpExpiry(LocalDateTime.now().plusMinutes(10));

        employeeRepository.save(emp);

        emailService.sendOtpEmail(emp.getEmail(), emp.getFullName(), otp);
    }

    @Override
    public void resetPassword(String email, String otp, String newPassword) {

        Employee emp = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email id not found"));

        if (emp.getOtp() == null || !emp.getOtp().equals(otp)) {
            throw new BadRequestException("Invalid OTP");
        }

        if (emp.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP expired");
        }

        emp.setPassword(passwordEncoder.encode(newPassword));
        emp.setOtp(null);
        emp.setOtpExpiry(null);

        employeeRepository.save(emp);
    }

	

}
