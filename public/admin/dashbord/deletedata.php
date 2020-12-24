<?php
include '../../database.php';

$obj = new Database();

echo $id = $_GET['id'];


$sql="DELETE FROM msg WHERE no='$id';";

$obj->delete('msg',$sql);

	// echo "Delete result is : ";
	// print_r($obj->getResult());

    echo "<script> location.href='index.php';</script>";

?>