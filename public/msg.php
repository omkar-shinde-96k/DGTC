<?php
	include 'database.php';

	$obj = new database();

    echo $name=$_POST['name'];
echo $email=$_POST['email'];
echo $number=$_POST['number'];
echo $subject=$_POST['subject'];
echo $msg=$_POST['msg'];


 


    echo $obj->insert('msg',['name'=>$name,'phone'=>$number,'email'=>$email,'subject'=>$subject,'msg'=>$msg]);
    
    echo json_encode("thank for your feedback");
	 
    header("Location:http://localhost/phpproject/dgt-clg/index.php");

?>


 
<!-- 
<table cellpadding="7px">
        <thead>
        <th>Id</th>
        <th>Name</th>
        <th>Address</th>
        <th>Class</th>
        <th>Phone</th>
        <th>Action</th>
        </thead>
        <tbody>
        <?php 
            while($row=mysqli_fetch_assoc($result)){
        ?>
            <tr>
            <td><?php echo $row['no'] ;?></td>
                <td><?php echo $row['name'] ;?></td>
                <td><?php echo $row['phone'] ;?></td>
                <td><?php echo $row['email'] ;?></td>
                <td><?php echo $row['subject'] ;?></td>
                <td><?php echo $row['msg'] ;?></td>
                <td>
                    <a href='edit.php?id=<?php echo $row['sid'] ;?>'>Edit</a>

                    <a href='delete-inline.php?id=<?php echo $row['sid'] ;?>'>Delete</a>
                    
                    
                </td>
            </tr>
            <?php
            }
            ?>
           
        </tbody>
    </table>
    <?php
    //mysqli_close($conn);
    ?> -->