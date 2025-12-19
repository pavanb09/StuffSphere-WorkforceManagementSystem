package com.coders.staffsphereworkforce.service;

public interface AuthService {
	
	  void forgotPassword(String email);

	    void resetPassword(String email, String otp, String newPassword);

}
