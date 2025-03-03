<?php
// upload.php

// Directory where PSD files will be saved
$uploadDir = "uploads/";
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $fileName = basename($_FILES['file']['name']);
    $targetFile = $uploadDir . $fileName;

    // Validate file type
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    if ($fileType != "psd") {
        echo "Error: Only PSD files are allowed.";
        exit();
    }

    // Check for upload errors
    if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        echo "Error: File upload failed.";
        exit();
    }

    // Move the file to the uploads directory
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        echo "The file " . htmlspecialchars($fileName) . " has been uploaded successfully.";
    } else {
        echo "Error: Unable to upload your file.";
    }
}
?>
