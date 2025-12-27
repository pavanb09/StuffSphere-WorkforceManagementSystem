package com.coders.staffsphereworkforce.config;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = Map.of(
            "cloud_name", System.getenv("CLOUDINARY_CLOUD_NAME"),
            "api_key", System.getenv("CLOUDINARY_API_KEY"),
            "api_secret", System.getenv("CLOUDINARY_API_SECRET")
        );
        return new Cloudinary(config);
    }
}

