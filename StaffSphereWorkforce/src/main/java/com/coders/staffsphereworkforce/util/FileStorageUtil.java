//package com.coders.staffsphereworkforce.util;
//
//import org.springframework.web.multipart.MultipartFile;
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//import java.util.UUID;
//
//public class FileStorageUtil {
//
//	public static String saveFile(String uploadDir, MultipartFile file) throws IOException {
//
//	    if (file == null || file.isEmpty()) {
//	        throw new IOException("File is empty");
//	    }
//
//	    Path uploadPath = Paths.get(uploadDir);
//
//	    // ✅ THIS IS THE FIX
//	    if (!Files.exists(uploadPath)) {
//	        Files.createDirectories(uploadPath);
//	    }
//
//	    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
//	    Path filePath = uploadPath.resolve(fileName);
//
//	    Files.copy(
//	        file.getInputStream(),
//	        filePath,
//	        StandardCopyOption.REPLACE_EXISTING
//	    );
//
//	    return filePath.toString();
//	}
//
//}
