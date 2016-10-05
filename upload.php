<?php

require_once './config.php';
if (isset($_FILES['img_test']['name']) && $_FILES['img_test']['name'] != '') {
    $i_created = date('Y-m-d H:i:s');
    $file_type = @$_FILES['img_test']['name'];
    $pieces = end(explode(".", $file_type));
    $img_test = generateRandomString(100) . '.' . $pieces;
    $targetfolder = "upload/";
    $targetfolder = $targetfolder . basename($img_test);
    if (move_uploaded_file($_FILES['img_test']['tmp_name'], $targetfolder)) {
        $insertImg = "INSERT INTO images (i_image,i_created) VALUES('$img_test','$i_created')";
        mysql_query($insertImg);
        echo json_encode(['status' => 0, 'message' => 'Image upload success']);
        exit;
    } else {
        echo json_encode(['status' => 1, 'message' => 'Something want wring']);
        exit;
    }
} else {
    echo json_encode(['status' => 1, 'message' => 'Invalid image selections']);
    exit;
}