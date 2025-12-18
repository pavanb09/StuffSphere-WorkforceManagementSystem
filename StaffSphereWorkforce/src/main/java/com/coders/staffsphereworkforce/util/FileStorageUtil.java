package com.coders.staffsphereworkforce.util;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

public class FileStorageUtil {

    public static String saveFile(String uploadDir, MultipartFile file) throws IOException {

        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File destination = new File(dir, fileName);

        file.transferTo(destination);

        return uploadDir + fileName;
    }
}
