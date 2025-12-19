package com.coders.staffsphereworkforce.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.coders.staffsphereworkforce.dto.auth.LoginRequest;
import com.coders.staffsphereworkforce.dto.auth.LoginResponse;
import com.coders.staffsphereworkforce.dto.password.ForgotPasswordRequest;
import com.coders.staffsphereworkforce.dto.password.ResetPasswordRequest;
import com.coders.staffsphereworkforce.exception.BadRequestException;
import com.coders.staffsphereworkforce.model.Employee;
import com.coders.staffsphereworkforce.repository.EmployeeRepository;
import com.coders.staffsphereworkforce.response.ApiResponse;
import com.coders.staffsphereworkforce.security.JWTUtil;
import com.coders.staffsphereworkforce.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	 private final EmployeeRepository employeeRepository;
	    private final PasswordEncoder passwordEncoder;
	    private final JWTUtil jwtUtil;
	    
	    private final AuthService authService;

	    public AuthController(EmployeeRepository employeeRepository,
	                          PasswordEncoder passwordEncoder,
	                          JWTUtil jwtUtil, AuthService authService) {
	        this.employeeRepository = employeeRepository;
	        this.passwordEncoder = passwordEncoder;
	        this.jwtUtil = jwtUtil;
	        this.authService = authService;
	    }

	    @PostMapping("/login")
	    public ApiResponse<LoginResponse> login(
	            @RequestBody LoginRequest request) {

	        Employee emp = employeeRepository.findByEmail(request.getEmail())
	                .orElseThrow(() ->
	                    new BadRequestException("Invalid credentials"));

	        if (!passwordEncoder.matches(
	                request.getPassword(), emp.getPassword())) {
	            throw new BadRequestException("Invalid credentials");
	        }

	        String token = jwtUtil.generateToken(emp);

	        LoginResponse res = new LoginResponse();
	        res.setToken(token);
	        res.setEmployeeId(emp.getId());
	        res.setRole(emp.getRole().name());

	        return new ApiResponse<>("Login successful", res);
	    }
	    

	    @PostMapping("/forgot-password")
	    public ResponseEntity<String> forgotPassword(
	            @RequestBody @Valid ForgotPasswordRequest request) {

	        authService.forgotPassword(request.getEmail());
	        return ResponseEntity.ok("OTP sent to registered email");
	    }

	    @PostMapping("/reset-password")
	    public ResponseEntity<String> resetPassword(
	            @RequestBody @Valid ResetPasswordRequest request) {

	        authService.resetPassword(
	                request.getEmail(),
	                request.getOtp(),
	                request.getNewPassword()
	        );

	        return ResponseEntity.ok("Password reset successful");
	    }
	    
	    
	   
}
