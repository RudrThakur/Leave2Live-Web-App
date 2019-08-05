////////////////////////////////JS Handler for login.html


////////////////////STUDENTS LOGIN HANDLER //////////////////////////////

var rootRef = firebase.database().ref("students");
rootRef.once("child_added", snap =>{
    var regnofromdb = snap.child("registernumber").val();
    var passfromdb  = snap.child("password").val(); 

    //onclick handler for login-btn
    $("#login-btn").click(function(){debugger;
        var regno = $("#registernumber").val();
        var pass = $("#pass").val();

        //If credentials are Correct
        if (regnofromdb == regno && passfromdb == pass){
            
        //alert success !
        alert("Login Success");
        
        
        //getting student profile from firebase

        var studentName = snap.child("studentname").val();
        var email  = snap.child("email").val(); 
        var phone  = snap.child("phone").val(); 
        var classAndSec = snap.child("classandsec").val();
        var arrearCount = snap.child("arrearcount").val();
        var department = snap.child("department").val();
        var dob = snap.child("dob").val();
        var leaveHistory = snap.child("leavehistory").val();


        //using localstorage to pass them into Javascript pages
        
        localStorage.setItem("registernumber", regno);
        localStorage.setItem("studentname", studentName);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("classandsec", classAndSec);
        localStorage.setItem("arrearcount", arrearCount);
        localStorage.setItem("department", department);
        localStorage.setItem("dob", dob);
        localStorage.setItem("leavehistory", leaveHistory);
        
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


///////////////////////////////////// STAFF LOGIN HANDLER /////////////////////////////////////
var staffDataRef = firebase.database().ref("staff");

staffDataRef.once("child_added", snap =>{

    var emailfromdb = snap.child("staffemail").val();
    var passwordfromdb  = snap.child("staffpass").val(); 

    $("#stafflogin-btn").click(function(){

    //Get Staff Credentials from Login Form
    var staffemailid = $("#staffemail").val();
    var staffpassword = $("#staffpass").val();


    //If credentials are Correct
    if (emailfromdb == staffemailid && passwordfromdb == staffpassword){
        
    //alert success !
    alert("Login Success");
    
    /*
    //getting student profile from firebase

    var studentName = snap.child("studentname").val();
    var email  = snap.child("email").val(); 
    var phone  = snap.child("phone").val(); 
    var classAndSec = snap.child("classandsec").val();
    var arrearCount = snap.child("arrearcount").val();
    var department = snap.child("department").val();
    var dob = snap.child("dob").val();
    var leaveHistory = snap.child("leavehistory").val();


    //using localstorage to pass them into Javascript pages
    /*
    localStorage.setItem("registernumber", regno);
    localStorage.setItem("studentname", studentName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("classandsec", classAndSec);
    localStorage.setItem("arrearcount", arrearCount);
    localStorage.setItem("department", department);
    localStorage.setItem("dob", dob);
    localStorage.setItem("leavehistory", leaveHistory);
    */
    //redirect to index page
    window.location.href ='staff/staffDashboard.html';

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
    
