//////////////// JS Handler for request.html

$(document).ready(function(){

//  Session Handling ////////////////////

if (!localStorage.getItem("registernumber")) {
    window.location.href = 'login.html';
    return false;

} 
else {
   
    //////////////////////////////////// Loading Student Profile ///////////////////////////


    //Add values to Profile Modal 
    $("#profile-register-number").html(localStorage.getItem("registernumber"));
    $("#profile-student-name").html(localStorage.getItem("studentname"));
    $("#profile-dob").html(localStorage.getItem("dob"));
    $("#profile-department").html(localStorage.getItem("department"));
    $("#profile-classandsec").html(localStorage.getItem("classandsec"));
    $("#profile-arrearcount").html(localStorage.getItem("arrearcount"));
    $("#profile-email").html(localStorage.getItem("email"));
    $("#profile-phone").html(localStorage.getItem("phone"));
    $("#profile-leave-history").html(localStorage.getItem("leavehistory"));

}

});

