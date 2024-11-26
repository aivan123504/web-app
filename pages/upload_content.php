<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if image file is uploaded
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $title = htmlspecialchars($_POST['title']);
        $description = htmlspecialchars($_POST['description']);
        
        // Directory to save uploaded image
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true); // Create uploads directory if it doesn't exist
        }

        // Get file details
        $fileName = basename($_FILES["image"]["name"]);
        $targetFilePath = $targetDir . $fileName;
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

        // Check if the file is an image
        if (in_array($fileType, ['jpg', 'jpeg', 'png', 'gif'])) {
            // Attempt to move the uploaded file to the target directory
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
                // Image uploaded successfully, trigger JavaScript alert
                echo "<script>
                        alert('Content added successfully!\\nTitle: $title\\nDescription: $description\\nImage stored at: $targetFilePath');
                        window.location.href = 'add.html'; // Optional: Redirect after success
                      </script>";
            } else {
                echo "<script>
                        alert('Sorry, there was an error uploading your image.');
                      </script>";
            }
        } else {
            echo "<script>
                    alert('Only image files are allowed (JPG, JPEG, PNG, GIF).');
                  </script>";
        }
    } else {
        echo "<script>
                alert('No file uploaded or error uploading the file.');
              </script>";
    }
} else {
    echo "<script>
            alert('Invalid request.');
          </script>";
}
?>
