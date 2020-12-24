 
<!DOCTYPE html>
<html>
<head>
<title>Slide Login Form Flat Responsive Widget Template :: w3layouts</title>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="keywords" content="Slide Login Form template Responsive, Login form web template, Flat Pricing tables, Flat Drop downs Sign up Web Templates, Flat Web Templates, Login sign up Responsive web template, SmartPhone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />

	 <script>
        addEventListener("load", function () {
            setTimeout(hideURLbar, 0);
        }, false);

        function hideURLbar() {
            window.scrollTo(0, 1);
        }
    </script>

	<!-- Custom Theme files -->
	<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
	<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all" />
	<!-- //Custom Theme files -->

	<!-- web font -->
	<link href="//fonts.googleapis.com/css?family=Hind:300,400,500,600,700" rel="stylesheet">
	<!-- //web font -->

</head>
<body>

<!-- main -->
<div class="w3layouts-main"> 
	<div class="bg-layer">
		<h1>Slide Login form</h1>
		<div class="header-main">
			<div class="main-icon">
				<span class="fa fa-eercast"></span>
			</div>
			<div class="header-left-bottom">
				<form action="$_SERVER['PHP_SELF']" method="post">

					<div class="icon1">
						<span class="fa fa-user"></span>
						<input type="email" name="email" placeholder="E-mail " required="">
					</div>

					<div class="icon1">
						<span class="fa fa-lock"></span>
						<input type="password" name="password" placeholder="Password" required="">
					</div>

					

					<div class="bottom">
						<input type="submit" value="save" ">
					</div>

					<div class="links">
						<p><a href="#">Forgot Password?</a></p>
						<p class="right"><a href="#">New User? Register</a></p>
						<div class="clear"></div>
					</div>

				</form>	
			</div>
			<div class="social">
				<ul>
					<li>or login using : </li>
					<li><a href="#" class="facebook"><span class="fa fa-facebook"></span></a></li>
					<li><a href="#" class="twitter"><span class="fa fa-twitter"></span></a></li>
					<li><a href="#" class="google"><span class="fa fa-google-plus"></span></a></li>
				</ul>
			</div>
		</div>
		
		<!-- copyright -->
	<!-- 	<div class="copyright">
			<p>© 2019 Slide Login Form . All rights reserved | Design by <a href="http://w3layouts.com/" target="_blank">W3layouts</a></p>
		</div> -->
		<!-- //copyright --> 
	</div>
</div>	
<!-- //main -->



<?php

  // if(!isset($_SESSION)){
  // 	echo "session is not set .<br>";
  // }else{
  // 	die("session die");
  // }



  // if(!isset($_SESSION)){
  	session_start();
  // 	echo "session is not set and now start .<br>";
  // }





	$db_host = "localhost";
 $db_user = "root";
 $db_pass = "";
 $db_name = "dgtc";
 // $result = array();


$conn = new mysqli($db_host,$db_user,$db_pass,$db_name);

if($conn->connect_error){
	die("connection failed");
}
if(!isset($SESSION['is_admin'])){

	 echo $email=$_POST['email'];
	 echo $password=$_POST['password'];


	$sql="SELECT email,password FROM admin WHERE email='".$email."' AND password='".$password."'";


	 $result= $conn->query($sql);

	 $row = $result->num_rows;

	if($row === 1){
	 echo "you are now login .<br> ";
	 $_SESSION['is_admin']=true;

	 $_SESSION['semail']=$semail;

print_r($_SESSION);

	 if($SESSION['is_admin']=true){
	 	echo "session is save .<br> " ;
	 	echo"<script> location.href='showmsg.php';</script>";
	 }
	 
	}else{
		echo "check your passwood or email .<br>";
	}
 

}else{
	echo "alredy login";
}

?>



</body>
</html>