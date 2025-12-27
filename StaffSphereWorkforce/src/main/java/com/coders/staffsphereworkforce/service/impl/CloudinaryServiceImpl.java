package com.coders.staffsphereworkforce.service.impl;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.coders.staffsphereworkforce.exception.FileStorageException;
import com.coders.staffsphereworkforce.service.CloudinaryService;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new FileStorageException("File is empty");
        }

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                    "folder", "staffsphere/profile-images",
                    "resource_type", "image"
                )
            );

            return result.get("secure_url").toString();

        } catch (IOException e) {
            throw new FileStorageException("Cloudinary upload failed", e);
        }
    }
}
