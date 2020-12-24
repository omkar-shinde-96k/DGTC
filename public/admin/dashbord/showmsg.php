<?php
// session_start();

 if(!isset($_SESSION['is_admin'])){  


  
$conn=mysqli_connect("localhost","root","","dgtc") or die("connection error");

$sql="select * from msg ORDER BY no DESC";

$result=mysqli_query($conn,$sql) or die( "query unsucessfull");
 
// header("Location:http://localhost/phpproject/dgt-clg/index.php");

// mysqli_close($conn);
 
$output= '
<table cellpadding="7px"  cellspacing="0" class="table table-striped" class="table-responsive" >
        </thead>
        <th scope="col" style="background-color:black;color:white;border-right:1px solid white;" >Id</th> 
        <th scope="col" style="background-color:black;color:white;border-right:1px solid white;" >Name</th>
        <th scope="col" style="background-color:black;color:white;border-right:1px solid white;"> phone</th>
        <th scope="col" style="background-color:black;color:white;border-right:1px solid white;"  >email</th>
        <th scope="col" style="background-color:black;color:white;border-right:1px solid white;" >subject</th>
        <th scope="col" style="background-color:black;color:white;border-right:1px solid white;" >massege</th>
        <th scope="col" style="background-color:black;color:white;border-right:1px solid white;" >Action</th>
        </thead>   ';

      
            while($row=mysqli_fetch_assoc($result)){

         
    $output .= " <tr>
           
             <td> {$row['no']}</td>  
                <td>  {$row['name']} </td>
                <td>  {$row['phone']} </td>
                <td>  {$row['email']}  </td>   
                <td> {$row['subject']} </td>
                <td>  {$row['msg']} </td>
                <td>
                   <a href='deletedata.php?id={$row['no']} '  class='text-danger'  > <i  aria-hidden='true'></i>  Delete</a> 

                  <!-- <button class='btn' onclick='msg()'> delete </button> -->
  
                </td>
            </tr>   ";
            
            }
            $output .= "</table>";
           
            mysqli_close($conn);

            echo $output;
             


  }else{
     echo"<script> location.href='admin/admin-login.php';</script>";
    echo "hiiii";
  }





  echo '    
  <script>
          
  function msg() {
     // $("#save-button").on("click",function(e){
     // 	e.preventDefault();
          var id =1;
          
                                         
          $.ajax({
              url: "deletedata.php",
              method: "GET",
              data:{
                  id: id,
                  
              },
              success:function(data){
                  alert("record deleted");
                  
                  $("#addform").trigger("reset");
                  
              }
          });
      }
  </script>  ';





?>
    
    


    