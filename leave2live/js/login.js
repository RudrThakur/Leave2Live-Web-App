//JS Handler for login.html
var rootRef = firebase.database().ref("students");
rootRef.once("child_added", snap =>{
    var regnofromdb = snap.child("registernumber").val();
    var passfromdb  = snap.child("password").val(); 

    //onclick handler for login-btn
    $("#login-btn").click(function(){
        var regno = $("#registernumber").val();
        var pass = $("#pass").val();

        //If credentials are Correct
        if (regnofromdb == regno && passfromdb == pass){
            
        //alert success !
        alert("Login Success");

        //getting student profile from firebase

        var studentname = snap.child("studentname").val();
        var email  = snap.child("email").val(); 
        var phone  = snap.child("phone").val(); 
        var classandsec = snap.child("classandsec").val();

        //using localstorage to pass them into Javascript pages

        localStorage.setItem("registernumber",regno);
        localStorage.setItem("studentname", studentname);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("classandsec", classandsec);
        
        //redirect to index page
        window.location.href ='index.html';
        
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

