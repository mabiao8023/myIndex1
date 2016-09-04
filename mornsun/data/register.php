<?php
header("content-type:application/json;charset=utf-8");
$email=$_REQUEST['email'];
$uName=$_REQUEST['uName'];
$conn=mysqli_connect('127.0.0.1','root','','mornsun',3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT * FROM register";
$rs=mysqli_query($conn,$sql);
$result=[];
$result1=[];
$result["email"]="error";
$result["username"]="error";
while(($row=mysqli_fetch_assoc($rs))!==null){
	if($row['email']==$email){
		$result["email"]="success";
	}
	if($row['username']==$uName){
		$result["username"]="success";
	}
}
	$result1[]=$result;
	echo json_encode($result1);