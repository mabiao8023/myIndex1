<?php
header("content-type:text/plain;charset=utf-8");
$email=$_REQUEST['email'];
$psw=$_REQUEST['psw'];
$conn=mysqli_connect('127.0.0.1','root','','mornsun',3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT * FROM register WHERE email='$email' AND psw='$psw'";
$rs=mysqli_query($conn,$sql);
while(($row=mysqli_fetch_assoc($rs))!==null){
	if(($row['email']==$email)&&($row['psw']==$psw))
	{
	  echo	"$row[username]";
	}
}