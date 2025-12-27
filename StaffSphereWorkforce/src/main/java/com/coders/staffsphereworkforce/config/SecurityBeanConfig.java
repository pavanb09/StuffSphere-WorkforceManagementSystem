package com.coders.staffsphereworkforce.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityBeanConfig {

	@Value("${FRONTEND_URLS}")
	private String FRONTENDURL;
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

	    CorsConfiguration config = new CorsConfiguration();

	    // ✅ Allow React frontend
	    config.setAllowedOrigins(List.of(FRONTENDURL));

	    // ✅ Allow HTTP methods
	    config.setAllowedMethods(List.of(
	            "GET", "POST", "PUT", "DELETE", "OPTIONS"
	    ));

	    // ✅ Allow headers (VERY IMPORTANT)
	    config.setAllowedHeaders(List.of(
	            "Authorization",
	            "Content-Type"
	    ));

	    // ✅ Allow sending JWT token
	    config.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source =
	            new UrlBasedCorsConfigurationSource();

	    source.registerCorsConfiguration("/**", config);

	    return source;
	}

}