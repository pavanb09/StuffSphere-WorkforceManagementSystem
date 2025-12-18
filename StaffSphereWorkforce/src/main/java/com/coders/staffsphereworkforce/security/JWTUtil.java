package com.coders.staffsphereworkforce.security;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.coders.staffsphereworkforce.model.Employee;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
	
	private static final String SECRET = 
			"staffsphere_super_secret_key_which_is_very_secure";
	
	private static final long EXPIRATION = 1000*60*60; // 1 HOUR
	
	public String generateToken(Employee emp) {

	    return Jwts.builder()
	        .setSubject(emp.getEmail())
	        .claim("employeeId", emp.getId())
	        .claim("role", emp.getRole().name())   // 🔥 ADD THIS
	        .setIssuedAt(new Date())
	        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
	        .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), SignatureAlgorithm.HS256)
	        .compact();
	}
	
	public Claims extractClaims(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(SECRET.getBytes())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	public Long getEmployeeId(String token) {
		return extractClaims(token).get("employeeId",Long.class);
	}
	
	public String getRole(String token) {
		return extractClaims(token).get("role",String.class);
	}
	
	public String getEmail(String token) {
		return extractClaims(token).getSubject();
	}
	
	

}
