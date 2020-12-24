function msg() {
    var msgname = $("#msgname").val();
    var msgphone = $("#msgphone").val();
    var msgemail = $("#msgemail").val();
    var msgsubject = $("#msgsubject").val();
    var msg = $("#msg").val();


    $.ajax({
        url: "msg.php",
        method: "POST",
        data:{
            name: msgname,
            number: msgphone,
            email: msgemail,
            subject: msgsubject,
            msg: msg,
        },
        success:function(data){
            alert("thank for yout feedback");
        }

    });


}



$(document).ready(function () {
    function showmsg() {
      $.ajax({
        url:"showmsg.php",
        type:"POST",
        success:function(data){
          $("#table-data").html(data);
        }
      });
    }
    showmsg();
  });
 


