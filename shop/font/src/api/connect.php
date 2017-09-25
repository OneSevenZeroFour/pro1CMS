<?php

    // 配置参数
    $servername = 'rm-wz9w4v621xko71doxo.mysql.rds.aliyuncs.com';
    $username = 'xiaoxiaoyuan';
    $password = 'yzl00-00yzl';
    $database = 'cms';

    //连接数据库
    $conn = new mysqli($servername,$username,$password,$database);

    // 检测连接
    if($conn->connect_errno){
        die('连接失败'.$conn->connect_error);
    }
    // echo 'success';
    // 设置编码
    $conn->set_charset('utf8');

?>