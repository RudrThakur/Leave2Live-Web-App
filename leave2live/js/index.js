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

//////////////////////////////////// FORM SUBMISSION HANDLER //////////////////////////////////

$("#leave-form-btn").click(function(){
           
    //Get Values of the inputs
    var studentRequestType = $('[name="request-type"]').val();
    var studentDayMode = $('#day-mode').val();
    var studentFromDate = $('#fromdate').val();
    var studentToDate, studentDays;

    //if MultipleDays is Selected
    if(multipleDaysFlag){
        studentToDate = $('#todate').val();
        studentDays = $('#days').val();
    }
    else{//else Set ToDate & Working Days as NA
        studentToDate = 'NA';
        studentDays = 'NA';
    }
    var studentTestCheck, studentTestType;

    //If test is Scheduled
    if(testCheckFlag)
    {
        studentTestCheck = 'yes';
        studentTestType = $('#test-type').val();
    }
    else{
        studentTestCheck = 'no';
        studentTestType = 'NA';
    }

    var studentReasonCategory = $('#reason-category').val();
    var studentReasonSpecific = $('#reasonspecific').val();
    var studentRequestStatus = 'submitted (CLASS TEACHER)';

    //Get Current Date
    var studentRequestDate = new Date();
    var dd = String(studentRequestDate.getDate()).padStart(2, '0');
    var mm = String(studentRequestDate.getMonth() + 1).padStart(2, '0');
    var yyyy = studentRequestDate.getFullYear();
    studentRequestDate = dd + '-' + mm + '-' + yyyy;

    //Store Request Data into a JS Object
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
        "testtype" : studentTestType,
        "todate" : studentToDate,
        "workingdays" : studentDays
    };

    //push StudentRequestData Object to firebase
    newRequestRef.push(studentRequestDataObject);

    //Alert Success
    alert("Your Request Has Been Submitted Successfully");

    return true;

});

//Logout Handler

$("#logout-btn").click(function(){

    //Clear Session 
    localStorage.clear();

    //Redirect to login.html
    window.location.href = 'login.html';

});

});
