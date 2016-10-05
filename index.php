<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="ajaxfileupload.js"></script>
<?php
require_once './config.php';
?>
<input type="file" name="img_test" id="img_test" onchange="addFileslogo();" />
<br />
<br />
<div id="img-gallery-postions">
    <?php
    $selectImg = "SELECT * FROM images";
    $query = mysql_query($selectImg);
    while ($row = mysql_fetch_array($query)) {
        ?>
        <img src="upload/<?php echo $row['i_image']; ?>" style="       max-height: 200px; max-width: 200px;border: 1px solid;">
        <?php
    }
    ?>
</div>

<script>
    function addFileslogo()
    {
        var base_path = 'upload/';
        var image_url = 'upload/';
        var action = 'upload.php';
        console.log(action);
        $.ajaxFileUpload
                ({
                    url: action,
                    secureuri: false,
                    fileElementId: 'img_test',
                    dataType: 'json',
                    //  data: {YII_CSRF_TOKEN:csrfTokenVal},
                    success: function (data, status)
                    {
                        if (data.status == '0') {
                            $('#img-gallery-postions').fadeOut('slow', function () {
                                $('#ma-footer-container-load').removeClass('hide');
                                $('#img-gallery-postions').load('allimages.php', function () {
                                    $('#img-gallery-postions').fadeIn('slow');
                                });
                            });
                        } else {
                            alert(data.message);
                        }
                        console.log(data.status);
                    },
                    error: function (data, status, e)
                    {
                        alert(e);
                    }
                });
    }

</script>
