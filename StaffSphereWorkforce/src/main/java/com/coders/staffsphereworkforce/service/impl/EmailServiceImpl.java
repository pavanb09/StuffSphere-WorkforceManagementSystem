package com.coders.staffsphereworkforce.service.impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.coders.staffsphereworkforce.service.EmailService;

@Service
public class EmailServiceImpl  implements EmailService{
	
	private final JavaMailSender mailSender;
	public EmailServiceImpl(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	
	@Override
	@Async
	public void sendEmail(String to, String subject, String body) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setSubject(subject);
			message.setText(body);
			
			mailSender.send(message);
			
			
		}catch (Exception e) {
			
			System.out.println("Email sending failed : " + e.getMessage());
		}
	}
	
	@Override
	public void sendOtpEmail(String to, String name, String otp) {

	    String subject = "StaffSphere - Password Reset OTP";

	    String body =
	            "Hello " + name + ",\n\n" +
	            "Your OTP for password reset is: " + otp + "\n" +
	            "This OTP is valid for 10 minutes.\n\n" +
	            "If you did not request this, please contact HR.\n\n" +
	            "Regards,\nStaffSphere Team";

	    sendEmail(to, subject, body);
	}

	
	

}
