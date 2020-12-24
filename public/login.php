<?php

  // if(!isset($_SESSION)){
  // 	echo "session is not set .<br>";
  // }else{
  // 	die("session die");
  // }



  if(!isset($_SESSION)){
  	session_start();
  	echo "session is not set and now start .<br>";
  }





	$db_host = "localhost";
 $db_user = "root";
 $db_pass = "";
 $db_name = "dgtc";
 // $result = array();


$conn = new mysqli($db_host,$db_user,$db_pass,$db_name);

if($conn->connect_error){
	die("connection failed");
}
if(!isset($SESSION['is_login'])){

	  $semail=$_POST['email'];
	  $spassword=$_POST['password'];


	$sql="SELECT email,password FROM students WHERE email='".$semail."' AND password='".$spassword."'";


	 $result= $conn->query($sql);

	 $row = $result->num_rows;

	if($row === 1){
	 echo "you are now login .<br> ";
	 $_SESSION['is_login']=true;

	 $_SESSION['semail']=$semail;

print_r($_SESSION);

	 if($SESSION['is_login']=true){
	 	echo "session is save .<br> " ;
	 	echo"<script> location.href='index.php';</script>";
	 }
	 
	}else{
		echo "check your passwood or email .<br>";
	}
 

}else{
	echo "alredy login";
}

?>