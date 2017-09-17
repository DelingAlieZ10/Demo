<meta charset='utf-8'>
<?php
    $baobeidata = array(
    //    array(
    //        'name'=>'衣服',
    //        'piece'=>'100',
    //        'jieshao'=>'这是一件衣服'
    //    ),
    //     array(
    //        'name'=>'包包',
    //        'piece'=>'100',
    //        'jieshao'=>'这是一件包包'
    //    ),
    //     array(
    //        'name'=>'裤子',
    //        'piece'=>'100',
    //        'jieshao'=>'这是一件裤子'
    //    ),
    );

    $servername = 'localhost';
    $username = 'root';
    $password = 'aadmin';
    $dbname = 'myDB';

    $conn = new mysqli($servername,$username,$password,$dbname);

    if($conn->connect_error){
        die("连接失败：" . $conn->connect_error);
    }
    // echo "连接成功";
    //连接完毕

    $sql = "SELECT name, piece, direction FROM shangpin";
     $result = $conn->query($sql);
     
     if ($result->num_rows > 0){
         $i = 0;
        while ($row = $result->fetch_assoc()){
            $baobeidata[$i]['name'] = $row['name'];
            $baobeidata[$i]['piece'] = $row['piece'];
            $baobeidata[$i]['jieshao'] = $row['direction'];
            // echo "id:". $row["name"]. "- NAME" . $row["piece"]. "" . $row["direction"]. "<br>";
           $i++;
        } 
        print_r($baobeidata); 
    }
 ?>