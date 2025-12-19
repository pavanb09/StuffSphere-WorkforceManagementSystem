package com.coders.staffsphereworkforce.dto.password;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ForgotPasswordRequest {
	
	 @NotBlank
	 @Email
	  private String email;

	 
	 public ForgotPasswordRequest(@NotBlank @Email String email) {
		super();
		this.email = email;
	 }

	 public ForgotPasswordRequest() {
		super();
	 }
	 
	 public String getEmail() {
		 return email;
	 }

	 public void setEmail(String email) {
		 this.email = email;
	 }

	 
	 
	 
	 

}
