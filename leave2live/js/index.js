//////////////// JS Handler for index.html

//  Session Handling ////////////////////

if (!localStorage.getItem("registernumber")) {
    window.location.href = 'login.html';
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
    $("#profile-leave-count").html(localStorage.getItem("leavecount"));

}

////////////////////////////////////// Firebase Reference /////////////////////////////////////

//Create a Reference to firebase
var newRequestRef = firebase.database().ref("requests");

// Document Ready

$(document).ready(function(){


/////////////////////////////// FORM INTERACTION //////////////////////////////////////////////

$("#day-mode").change(function(){

    if($("#day-mode").val() == "More Than a Day"){
        $("#todate-box").show();
        $("#days-box").show();
    }
    else{
        $("#todate-box").hide();
        $("#days-box").hide();
    }
});

$("#test-check").click(function(){
    if($(this).prop("checked") == true){
        $("#test-type-box").show();
    }
    else{
        $("#test-type-box").hide();
    }
});

//////////////////////////////////// FORM SUBMISSION HANDLER //////////////////////////////////

$("#leave-form-btn").click(function(){
           
    //Get Values of the inputs
    var studentRequestType = $('[name="request-type"]').val();
    var studentDayMode = $('#day-mode').val();
    var studentFromDate = $('#fromdate').val();
    var studentToDate = $('#todate').val();
    var studentDays = $('#days').val();
    var studentTestCheck = "NO";

    if($("#test-check").prop("checked") == true)
        studentTestCheck = "YES";
    else
        studentTestCheck = "NO";

    var studentTestType = $('#test-type').val();
    var studentReasonCategory = $('#reason-category').val();
    var studentReasonSpecific = $('#reasonspecific').val();
    var studentRequestStatus = 'submitted(CLASS TEACHER)';

    //Get Current Date
    var studentRequestDate = new Date();
    var dd = String(studentRequestDate.getDate()).padStart(2, '0');
    var mm = String(studentRequestDate.getMonth() + 1).padStart(2, '0');
    var yyyy = studentRequestDate.getFullYear();
    studentRequestDate = dd + '-' + mm + '-' + yyyy;

    //////////////////////// 
    // Validation 
    ///////////////////////

    var validFlag = true;


    // Day Mode

    if(studentDayMode == "Choose Day Mode"){
        $("#day-mode-display").html("This Field is Required");
        validFlag = false;
    }

    else{
        $("#day-mode-display").html("");
    }

    // From Date

    if(studentFromDate == ""){
        $("#fromdate-display").html("This Field is Required");
        validFlag = false;
    }

    else{
        $("#fromdate-display").html("");
    }


    //To Date

    if(studentDayMode == "More Than a Day" &&
       studentToDate == ""){
        $("#todate-display").html("This Field is Required");
        validFlag = false;
    }
    else{
        $("#todate-display").html("");
    }

    // Number of Working Days
    if(studentDays == "" && 
       studentDayMode == "More Than a Day"){
        $("#days-display").html("This Field is Required");
        validFlag = false;
    }
    else{
        $("#days-display").html("");
    }

    if(studentTestCheck == "YES" && 
       studentTestType == "Choose Test Type"){
        $("#test-type-display").html("This Field is Required");
        validFlag = false;
    }
    else{
        $("#test-type-display").html("");
    }

    // Reason Category

    if(studentReasonCategory == "Choose Reason Category"){
        $("#reason-category-display").html("This Field is Required");
        validFlag = false;
    }
    else{
        $("#reason-category-display").html("");
    }

    // Reason Specific

    if(studentReasonSpecific == ""){
        $("#reason-specific-display").html("This Field is Required");
        validFlag = false;
    }
    else{
        $("#reason-specific-display").html("");
    }


    //Store Request Data into a JS Object

    if(validFlag){
        var studentRequestDataObject = {
    
            "date" : studentRequestDate,
            "daymode" : studentDayMode,
            "fromdate" : studentFromDate,
            "reasoncategory" : studentReasonCategory,
            "reasonspecific" : studentReasonSpecific,
            "registernumber" : localStorage.getItem("registernumber"),
            "requesttype" : studentRequestType,
            "status" : studentRequestStatus,
            "testcheck" : studentTestCheck,
            "classteacherremarks" : "NA",
            "acoremarks" : "NA",
            "hodremarks" : "NA",
            "testtype" : (studentTestCheck == "YES") ? studentTestType : "NA",
            "todate" : (studentDayMode == "More Than a Day") ? studentToDate : "NA",
            "workingdays" :(studentDayMode == "More Than a Day") ? studentDays : "NA",
        };
        
        //push StudentRequestData Object to firebase
        newRequestRef.push(studentRequestDataObject);

        //Alert Success
        alert("Your Request Has Been Submitted Successfully");

        return true;
    }

    else{
        return false;
    }

});

//Logout Handler

$("#logout-btn").click(function(){

    //Clear Session 
    localStorage.clear();

    //Redirect to login.html
    window.location.href = 'login.html';

});

});
