////////////////////////////////JS Handler for login.html

//////////////
// GLOBALS
/////////////
var studentLoginFlag = false;
var staffLoginFlag = false;

////////////////////////// Login Handler for Students

var rootRef = firebase.database().ref("students");

rootRef.once("value", snap =>{

    //onclick handler for login-btn
    $("#login-btn").click(function(){
        var regno = $("#registernumber").val();
        var pass = $("#pass").val();

        snap.forEach(function(childNode){

            var regnofromdb = childNode.child("registernumber").val();
            var passfromdb  = childNode.child("password").val(); 

            //If credentials are Correct
            if (regnofromdb == regno && passfromdb == pass){
                   
                // Set Login Success Flag
                studentLoginFlag = true;
                
                //getting student profile from firebase

                var studentName = childNode.child("studentname").val();
                var email  = childNode.child("email").val(); 
                var phone  = childNode.child("phone").val(); 
                var classAndSec = childNode.child("classandsec").val();
                var arrearCount = childNode.child("arrearcount").val();
                var department = childNode.child("department").val();
                var dob = childNode.child("dob").val();
                var leaveCount = childNode.child("leavecount").val();


                //using localstorage to pass them into Javascript pages
                
                localStorage.setItem("registernumber", regno);
                localStorage.setItem("studentname", studentName);
                localStorage.setItem("email", email);
                localStorage.setItem("phone", phone);
                localStorage.setItem("classandsec", classAndSec);
                localStorage.setItem("arrearcount", arrearCount);
                localStorage.setItem("department", department);
                localStorage.setItem("dob", dob);
                localStorage.setItem("leavecount", leaveCount);
                
            }
        });

        if(studentLoginFlag){
            alert("Login Success !");
            //redirect to index page
            window.location.href ='index.html';
            return false;
        }
    
        else{
            alert("Login Failed !");
            return true;
        }
    });
});


////////////////////////////////// Login Handler for Staff

var staffDataRef = firebase.database().ref("staff");

staffDataRef.once("value", snap =>{

    $("#stafflogin-btn").click(function(){

          //Get Staff Credentials from Login Form
          var staffemailid = $("#staffemail").val();
          var staffpassword = $("#staffpass").val();

            snap.forEach(function(childNode){

                var emailfromdb = childNode.child("staffemail").val();
                var passwordfromdb  = childNode.child("staffpass").val(); 

                //If credentials are Correct
                if (emailfromdb == staffemailid && passwordfromdb == staffpassword){
                    
                // Set Login Flag to TRUE
                staffLoginFlag = true;
                
                //getting staff profile from firebase

                var staffProfileName = childNode.child("staffname").val();
                var staffProfileEmail  = emailfromdb; 
                var staffProfilePhone  = childNode.child("staffphone").val(); 
                var staffProfileId = childNode.child("staffid").val();
                var staffProfileDepartment = childNode.child("staffdep").val();
                var staffProfileIsClassTeacherOf = childNode.child("isclassteacherof").val();
                var staffProfileIsAcoOf = childNode.child("isacoof").val();

                //using localstorage to pass them into Javascript pages
                
                localStorage.setItem("staffname", staffProfileName);
                localStorage.setItem("staffemail", staffProfileEmail);
                localStorage.setItem("staffphone", staffProfilePhone);
                localStorage.setItem("staffid", staffProfileId);
                localStorage.setItem("staffdepartment", staffProfileDepartment);
                localStorage.setItem("staffisclassteacherof", staffProfileIsClassTeacherOf);
                localStorage.setItem("staffisacoof", staffProfileIsAcoOf);
                localStorage.setItem("staffRole", "Class Teacher");

                }

            });

        if(staffLoginFlag){
            alert("Login Success !");
            //redirect to index page
            window.location.href ='staff/staffDashboard.html';
            return false;
        }
    
        else{
            alert("Login Failed !");
            return true;
        }
    });
});
  
//Login Slider for HOD and Admin 

function openLoginSlider() {
    document.getElementById("loginnav").style.width = "100%";
}
  
function closeLoginSlider() {
    document.getElementById("loginnav").style.width = "0";
}

// Role Changer for Login Slider

function askAdminLogin(){
    
    $("#hod-login-box").fadeOut();//Hide Hod Login
    $("#admin-login-box").fadeIn();//Show Admin Login

}

function askHodLogin(){

    $("#admin-login-box").fadeOut();//Hide Admin Login
    $("#hod-login-box").fadeIn();//Show Admin Login
}

/////////////////////////////////////////////////// Login Handler for HOD

$("#hod-login-btn").click(function(){

var hodDepartment = $("#hod-department").val();
var hodPassword = $("#hodpass").val();

//////////////////// HOD LOGIN VALIDATION

//If password field is empty
if (!hodPassword){
    //Show Failed Message When No Credentials entered
    $("#hod-login-message-failed").fadeIn();

    //Hide after 5 seconds
    setTimeout(function() { 
        $("#hod-login-message-failed").fadeOut(); 
    }, 5000);
}

else{

    //Reference to firebase for table HOD
    var hodLoginRef = firebase.database().ref("hod");

    hodLoginRef.child(hodDepartment).once("value", function(hodSnap){
  
        //Retrieve HOD Profile data by passing the deparment as Search Key
        var hodData = hodSnap.val();

        //Get HOD Credentials
        var hodPassFromDB = hodData.hodpass;

        
        if(hodPassFromDB == hodPassword){

            //Show Success Message When Logged In
            $("#hod-login-message-success").fadeIn();

            //Hide after 5 seconds
            setTimeout(function() { 
                $("#hod-login-message-success").fadeOut(); 
                
            }, 5000);

            //Display Redirect Message
            setTimeout(function(){
                $("#hod-login-redirect-message").show();
            }, 2000);

            //Redirect
            setTimeout(function(){

                //Save HOD Profile in Local
                localStorage.setItem("hodemail", hodData.hodemail);
                localStorage.setItem("hodname", hodData.hodname);
                localStorage.setItem("hodphone", hodData.hodphone);
                localStorage.setItem("hoddepartment", hodData.hodDepartment);

                
                //Redirect to HOD Dashboard
                window.location.href = 'hod/hodDashboard.html';

            }, 5000);
        }

        else{
             //Show Failed Message When Wrong Credentials
             $("#hod-login-message-failed").fadeIn();

             //Hide after 5 seconds
             setTimeout(function() { 
                 $("#hod-login-message-failed").fadeOut(); 
             }, 5000);
        }
    })
}

});

///////////////////////////////// Login Handler for ADMIN

$("#admin-login-btn").click(function(){


    //Get the password entered by the user
    var adminPassword = $("#adminpass").val();

        //If password field is empty
    if (!adminPassword){
        //Show Failed Message When No Credentials entered
        $("#admin-login-message-failed").fadeIn();

        //Hide after 5 seconds
        setTimeout(function() { 
            $("#admin-login-message-failed").fadeOut(); 
        }, 5000);
    }


    else{

    //Reference to firebase for table ADMIN
    var adminDataRef = firebase.database().ref("admin");

    //Iterate through the ADMIN Table
    adminDataRef.once("value", function(adminSnap){

        //Retrieve the admin Credentials
        var adminCredentials = adminSnap.val();

        var adminPassFromDB = adminCredentials.adminpass;

        if(adminPassword == adminPassFromDB){
   
            //Show Success Message When Logged In
            $("#admin-login-message-success").fadeIn();

            //Hide after 5 seconds
            setTimeout(function() { 
                $("#admin-login-message-success").fadeOut(); 
            }, 5000);
        }
        
        else{
            //Show Failed Message When Wrong Credentials
            $("#admin-login-message-failed").fadeIn();

            //Hide after 5 seconds
            setTimeout(function() { 
                $("#admin-login-message-failed").fadeOut(); 
            }, 5000);

        }

        });

    }

})