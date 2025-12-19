package com.coders.staffsphereworkforce.dto.password;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ResetPasswordRequest {
	
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String otp;

    @NotBlank
    private String newPassword;

	public ResetPasswordRequest(@NotBlank @Email String email, @NotBlank String otp, @NotBlank String newPassword) {
		super();
		this.email = email;
		this.otp = otp;
		this.newPassword = newPassword;
	}

	public ResetPasswordRequest() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
    
    

}
