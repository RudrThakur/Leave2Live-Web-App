// Rudr Thakur
// staffLeaveForm.js

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

    autoFillStaffDetails();

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
    };

        // Function to validate Staff Leave Form
    function validateStaffLeaveForm(){

        // Global Error Flag
        var errorFlag = true;


        if($("#staff-name").val() === ""){
            $('#staff-name-error').show();
            errorFlag = false;
        }
        else{
            $('#staff-name-error').hide();
        }


        if($("#staff-id").val() === ""){
            $('#staff-empno-error').show();
            errorFlag = false;
        }
        else{
            $('#staff-empno-error').hide();
        }


        if($("#staff-doj").val() === ""){
            $('#staff-doj-error').show();  
            errorFlag = false;
        }
        else{
            $('#staff-doj-error').hide();
        }

        if($("#staff-noofdays").val() === ""){
            $('#staff-noofdays-error').show();  
            errorFlag = false;
        }
        else{
            $('#staff-noofdays-error').hide();
        }

        if($("#staff-fromdate").val() === ""){
            $('#staff-fromdate-error').show();  
            errorFlag = false;
        }
        else{
            $('#staff-fromdate-error').hide();
        }

        if($("#staff-todate").val() === ""){
            $('#staff-todate-error').show();  
            errorFlag = false;
        }
        else{
            $('#staff-todate-error').hide();
        }

        if($("#staff-leavenature").val() === ""){
            $('#staff-leavenature-error').show();
            errorFlag = false;
    
        }
        else{
            $('#staff-leavenature-error').hide();
        }

        if($("#staff-department").val() === ""){
            $('#staff-department-error').show();
            errorFlag = false;

        }
        else{
            $('#staff-department-error').hide();
        }
        
        if($("#staff-coffdate").val() === ""){
            $('#staff-coffdate-error').show();
            errorFlag = false;

        }
        else{
            $('#staff-coffdate-error').hide();
        }

        if($("#staff-designation").val() === ""){
            $('#staff-designation-error').show();
            errorFlag = false;

        }
        else{
            $('#staff-designation-error').hide();
        }

        if($("#staff-dateofapplication").val() === ""){
            $('#staff-dateofapplication-error').show();
            errorFlag = false;
    
        }
        else{
            $('#staff-dateofapplication-error').hide();
        }

        if($("#staff-worknature").val() === ""){
            $('#staff-worknature-error').show();
            errorFlag = false;
    
        }
        else{
            $('#staff-worknature-error').hide();
        }

        if($("#staff-phone").val() === ""){
            $('#staff-phone-error').show();
            errorFlag = false;
    
        }
        else{
            $('#staff-phone-error').hide();
        }

        if($("#staff-address").val() === ""){
            $('#staff-address-error').show();
            errorFlag = false;

        }
        else{
            $('#staff-address-error').hide();
        }

        if($("#staff-reason").val() === ""){
            $('#staff-reason-error').show();
            errorFlag = false;
        }
        else{
            $('#staff-reason-error').hide();
        }

        if(errorFlag){

            if(submitStaffLeaveForm()){
                $("#updating-message").show();

                //Hide after 5 seconds
                setTimeout(function() { 
                    $("#action-success-message").fadeIn(1000);
                }, 5000);
        
                    //Hide after 5 seconds
                setTimeout(function() { 
                    $("#action-success-message").fadeOut(); 
                }, 5000);
        
                //Hide after 5 seconds
                setTimeout(function() { 
                    $("#updating-message").hide();
                    //reload the page
                    location.reload();
                }, 7000)
            }

            else{
                $("#updating-message").show();

                //Hide after 5 seconds
                setTimeout(function() { 
                    $("#action-failure-message").fadeIn(1000);
                }, 5000);
        
                //Hide after 5 seconds
                setTimeout(function() { 
                    $("#updating-message").hide();
                }, 7000)

            }
        
        }

    };

    // Function to Submit Staff Leave Form
    function submitStaffLeaveForm(){

        // Storing Form Data 
        var staffEmpNo = localStorage.getItem("staffid");
        var staffDays = $('#staff-noofdays').val();
        var staffFromDate = $('#staff-fromdate').val();
        var staffToDate = $('#staff-todate').val();
        var staffReason = $('#staff-reason').val();
        var staffLeaveNature = $('#staff-leavenature').val();
        var staffCoffDate = $('#staff-coffdate').val();
        var staffDateOfApplication = $('#staff-dateofapplication').val();
        var staffWorkNature = $('#staff-worknature').val();

        //Create a Reference to firebase
        var staffRequestsRef = firebase.database().ref("staffrequests");
        var staffRequestObject = {
            'staffempno' : staffEmpNo,
            'staffdays' : staffDays,
            'stafffromdate' : staffFromDate, 
            'stafftodate' : staffToDate, 
            'staffreason' : staffReason,
            'staffleavenature' : staffLeaveNature,
            'staffcoffdate' : staffCoffDate, 
            'staffworknature' : staffWorkNature,
            'staffdateofapplication' : staffDateOfApplication
        };

        //push StudentRequestData Object to firebase
        staffRequestPromise = staffRequestsRef.push(staffRequestObject);

        return staffRequestPromise;
    };

    // Logout
    function logout(){
        localStorage.clear();
        window.location.href = "../login.html";
    };

}









