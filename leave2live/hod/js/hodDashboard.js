//  Session Handling ////////////////////

if (!localStorage.getItem("hodemail")) {

    //Redirect to login page If New User
    window.location.href = '../login.html';
} 
else {
   
    //////////////////////////////////// Loading HOD Profile ///////////////////////////

    //Add values to HOD Profile Modal 
    $("#profile-hod-email").html(localStorage.getItem("hodemail"));
    $("#profile-hod-name").html(localStorage.getItem("hodname"));
    $("#profile-hod-phone").html(localStorage.getItem("hodphone"));
    $("#profile-hod-department").html(localStorage.getItem("hoddepartment"));
    $("#profile-hod-staffid").html(localStorage.getItem("hodstaffid"));
    $("#profile-hod-isacoof").html(localStorage.getItem("hodisacoof"));
    $("#profile-hod-isclassteacherof").html(localStorage.getItem("hodisclassteacherof"));

}

//When Logout button is Clicked
function logout(){

    localStorage.clear();
    //Go back to Login Page
    window.location.href ='../login.html';
};