package com.coders.staffsphereworkforce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import com.coders.staffsphereworkforce.security.JwtAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, CorsConfigurationSource corsConfigurationSource) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    	  http
    	  .cors(cors -> cors.configurationSource(corsConfigurationSource))
          .csrf(csrf -> csrf.disable())
          .sessionManagement(session ->
              session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .authorizeHttpRequests(auth -> auth
              .requestMatchers("/api/auth/**","/uploads/**").permitAll()
              
              .anyRequest().authenticated()
          )
          .exceptionHandling(ex -> ex
              .accessDeniedHandler((request, response, accessDeniedException) -> {
                  response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                  response.setContentType("application/json");
                  response.getWriter().write("""
                      {
                        "success": false,
                        "message": "Access denied",
                        "data": null
                      }
                  """);
              })
          )
          .addFilterBefore(jwtAuthenticationFilter,
              UsernamePasswordAuthenticationFilter.class);

      return http.build();
    }

}
