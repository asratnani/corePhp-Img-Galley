<?php
require_once './config.php';
$selectImg = "SELECT * FROM images";
$query = mysql_query($selectImg);
while ($row = mysql_fetch_array($query)) {
    ?>
    <img src="upload/<?php echo $row['i_image']; ?>" style="     max-height: 200px;   max-width: 200px;border: 1px solid;">
    <?php
}