<?php
header("Content-Type: text/html; charset=gb2312");
$servername = "localhost";
$username = "root";
$password = "qqmi0775775";

$dbname="hearthstone";
// 创建连接
$conn = new mysqli($servername, $username, $password,$dbname);
 
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$sql = "SELECT * FROM card";
$result = $conn->query($sql);
 
if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo json_encode($row);
echo "!";
    }
} else {
    echo "0 结果";
}
$conn->close();
?>