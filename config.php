<?php

mysql_connect('localhost', 'root', '') or die();
mysql_select_db('gallery_demo') or die();

function p($data, $exit = 1) {
    echo "<pre>";
    print_r($data);
    if ($exit == 1) {
        exit;
    }
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>