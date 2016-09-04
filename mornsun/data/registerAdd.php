<?php
header("content-type:text/plain;charset=utf-8");
$email=$_REQUEST['email'];
$uName=$_REQUEST['uName'];
$psw=$_REQUEST['password'];
$conn=mysqli_connect('127.0.0.1','root','','mornsun',3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="INSERT INTO register VALUES(null,'$email','$uName','$psw')";
$rs=mysqli_query($conn,$sql);
if($rs){
	echo "success";
}else{
	echo "error";
}