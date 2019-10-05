//  Session Handling ////////////////////

if (!localStorage.getItem("hodemail")) {

    //Redirect to login page If New User
    window.location.href = '../login.html';
} 
else {
   
    //////////////////////////////////// Loading HOD Profile ///////////////////////////

    //Add values to Staff Profile Modal 
    $("#profile-hod-email").html(localStorage.getItem("hodemail"));
    $("#profile-hod-name").html(localStorage.getItem("hodname"));
    $("#profile-hod-phone").html(localStorage.getItem("hodphone"));
    $("#profile-hod-department").html(localStorage.getItem("hoddepartment"));

}