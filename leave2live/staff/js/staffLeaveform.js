// Rudr Thakur

///////////  Session Handling ////////////////////

if (!localStorage.getItem("staffemail")) {
    window.location.href = '../login.html';

} 
else {
   
    //////////////////////////////////// Loading Student Profile ///////////////////////////


    //Add values to Staff Profile Modal 
    $("#profile-staff-name").html(localStorage.getItem("staffname"));
    $("#profile-staff-id").html(localStorage.getItem("staffid"));
    $("#profile-staff-email").html(localStorage.getItem("staffemail"));
    $("#profile-staff-department").html(localStorage.getItem("staffdepartment"));
    $("#profile-staff-phone").html(localStorage.getItem("staffphone"));
    $("#profile-staff-isclassteacherof").html(localStorage.getItem("staffisclassteacherof"));
    $("#profile-staff-isacoof").html(localStorage.getItem("staffisacoof"));
    $("#profile-staff-doj").html(localStorage.getItem("staffdoj"));
    $("#profile-staff-designation").html(localStorage.getItem("staffdesignation"));
    $("#profile-staff-address").html(localStorage.getItem("staffaddress"));
}


// Function to Auto Fill the leave form
function autoFillStaffDetails(){
    $("#staff-name").val(localStorage.getItem("staffname"));
    $("#staff-id").val(localStorage.getItem("staffid"));
    $("#staff-doj").val(localStorage.getItem("staffdoj"));
    $("#staff-department").val(localStorage.getItem("staffdepartment"));
    $("#staff-designation").val(localStorage.getItem("staffdesignation"));
    var today = new Date();
    var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    $("#staff-dateofapplication").val(currentDate);
    $("#staff-phone").val(localStorage.getItem("staffphone"));
    $("#staff-address").val(localStorage.getItem("staffaddress"));
}


// Logout
function logout(){
    localStorage.clear();
    window.location.href = "../login.html";
}

autoFillStaffDetails();

