<?php
    $servername = 'localhost';
    $username = 'root';
    $password = 'aadmin';
    $dbname = 'myDB';

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("连接失败：" . $conn->connect_error);
    }

    //读取数据
    $sql = "SELECT username, password,name FROM MYGUESTS";
    $result = $conn->query($sql);
    $userid = $_POST['name'];
    $userpsd = $_POST['password'];
    

    if ($result->num_rows > 0){
        while ($row = $result->fetch_assoc()){
            //echo "id:". $row["id"]. "- NAME" . $row["username"]. "" . $row["password"]. "<br>";
            if($row["username"] === $userid && $row["password"] === $userpsd){
                echo "登录成功";
                echo $row["name"];
                break;
            }
            else {
                echo "";
            }
        }  
    }


     else {
            echo "0 结果";
        }

    $conn->close();
?>