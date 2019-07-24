//JS Handler for login.html
var rootRef = firebase.database().ref("students");
rootRef.on("child_added", snap =>{
    var regnofromdb = snap.child("registernumber").val();
    var passfromdb  = snap.child("password").val(); 

    //onclick handler for login-btn
    $("#login-btn").click(function(){
        debugger;
        var regno = $("#registernumber").val();
        var pass = $("#pass").val();
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
    });

});

