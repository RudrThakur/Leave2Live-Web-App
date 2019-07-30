////////////////////////////////JS Handler for login.html 
///////////////////// Staff Login Section

var rootRef = firebase.database().ref("students");
rootRef.once("child_added", snap =>{
    var emailFromDB = snap.child("staffemail").val();
    var passFromDB  = snap.child("staffpassword").val(); 

    //onclick handler for login-btn
    $("#login-btn").click(function(){
        var email = $("#staffemail").val();
        var pass = $("#staffpass").val();

        //If credentials are Correct
        if (emailFromDB == email && passFromDB == pass){
            
        //alert success !
        alert("Login Success");

        //getting staff profile from firebase

        var staffName = snap.child("staffname").val();
        var staffEmail  = snap.child("email").val(); 
        var staffPhone  = snap.child("phone").val(); 
        var staffDepartment = snap.child("department").val();

        //using localstorage to pass them into Javascript pages

        localStorage.setItem("staffname", staffName);
        localStorage.setItem("staffemail", staffEmail);
        localStorage.setItem("staffphone", staffPhone);
        localStorage.setItem("staffdepartment", staffDepartment);
        
        //redirect to index page
        window.location.href ='../staff/index.html';

        return false;
        }

        //If Credentials are wrong
        else{
        //alert Failure !
        alert("Invalid Credentials !");

        return true;
        }
    });

});

