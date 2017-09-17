<?php
    $servername = 'localhost';
    $username = 'root';
    $password = 'aadmin';
    $dbname = 'myDB';
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die("failed:" . $conn->connect_error);
    }
    //连接完成
    $sql = "INSERT INTO myguests (username,password,name) VALUES ('".$_POST['usertxt']."','".$_POST['userpsd']."','".$_POST['username']."')";
     if($conn->multi_query($sql) === TRUE){
             echo "创建账号成功，快去登录吧";
        }
        else {
    echo "Error: " . $sql . "<br>" . $conn->error;
        }
 ?>