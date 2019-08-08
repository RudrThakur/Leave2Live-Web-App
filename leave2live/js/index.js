//////////////// JS Handler for index.html



/////////////////////////// GLOBALS //////////////////////////

//FromDate Globals
var globalFromDateObject, globalFromDay, globalFromMonth, globalFromYear, globalDayDifferenceFromDate;

//ToDate Globals
var globalToDateObject, globalToDay, globalToMonth, globalToYear, globalDayDifferenceToDate;

//DayMode Globals
var globalDayMode;

//Test Type Global 
var globalTestType;

//Global Flags
var testCheckFlag = false;
var multipleDaysFlag = false;

//Error Flags 
var validRequestFlag = false;
var validDatesFlag = false;
var validWorkingDaysFlag = true;
var validReasonCategoryFlag = false;
var validReasonSpecificFlag = false;
var validArrearCountFlag = false;
var validAttendanceFlag = false;
var validLeaveCountFlag = false;
var validTestTypeFlag = true;
var validDayModeFlag = false;

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

///////////////////////////////// Initial Validations /////////////////////

    //Initial Validation Leave Form


    //Request Type 
    if(!$("input[name='request-type']:checked").val()){
        $(".request-type-display").html("Please Choose A Request Type");
        $(".request-type-display").css("background-color","#FF9393");
    }

    //Day Mode
    if($("#day-mode").val() == "Choose Day Mode"){
        $(".day-mode-display").html("Please Choose A Day Mode");
        $(".day-mode-display").css("background-color","#FF9393");

        $("#fromdate-box").hide();//Hide FromDate
        $("#todate-box").hide();//Hide ToDate
        $("#days-box").hide();//Hide Days
    }

    //From Date
    if(!$("#fromdate").val()){
        $(".display-fromdate").html("Please Choose A Date");
        $(".display-fromdate").css("background-color","#FF9393");
      
    }

    // To Date
    if(!$("#todate").val()){
        $(".display-todate").html("Please Choose A Date");
        $(".display-todate").css("background-color","#FF9393");

    }

    // Number of Working Days
    if(!$("#days").val()){
        $(".display-days").html("Please Enter Number Of Working Days");
        $(".display-days").css("background-color","#FF9393");
    }

    //Reason Category
    if($("#reason-category").val() == "Choose Reason Category ..."){
        $(".display-reason-category").html("Please Enter Reason Category");
        $(".display-reason-category").css("background-color","#FF9393");
    }

    //Arrear Count
    if(!$("#arrearcount").val()){
        $(".display-arrearcount").html("Please Enter Number of Arrears");
        $(".display-arrearcount").css("background-color","#FF9393");
    }

    //Attendance
    if(!$("#attendance").val()){
        $(".display-attendance").html("Please Enter Your current Attendance Percentage");
        $(".display-attendance").css("background-color","#FF9393");
    }

    //Leave count
    if(!$("#leave-count").val()){
        $(".display-leave-count").html("Please Enter Number of Days leave taken earlier this Month");
        $(".display-leave-count").css("background-color","#FF9393");
    }

    //Reason Specific
    if(!$("#reasonspecific").val()){
        $(".display-reasonspecific").html("Please Specify your Reason");
        $(".display-reasonspecific").css("background-color","#FF9393");
    }

    //Test Type
    if($("#test-type").val() == "Choose Test Type ..."){
        $(".display-test-type").html("Please Specify the Exam");
        $(".display-test-type").css("background-color","#FF9393");
    }

    
//////////////////// Functions //////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}

//function to find the day from the date
function dayofweek(d, m, y) 
{ 
    var t = Array(0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ); 
    y = y - (m < 3); 
    var dayNumber = Math.round(( y + y/4 - y/100 + y/400 + t[m-1] + d) % 7); 
    var days = Array("Sunday", "Monday" ,"Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    return days[dayNumber-1];
} 

//function to Calculate Difference between dates in Days Count
function diffInDays(fromDateObject, toDateObject){
    return fromDateObject.diff(toDateObject, 'days');
}

/////////////////////////// Event Handlers ////////////////////


//Request Type Handler
$("input[name='request-type']").change(function(){
    var requestType = $("input[name='request-type']:checked").val();
    if(requestType){
        //show request type
        $(".request-type-display").html("Your current Request Type is "+ requestType);
        $(".request-type-display").css("background-color","rgba(0, 0, 255, 0.212)");

        //Switch Error Flag to clear
        validRequestFlag = true; 

    }
    //hide request-type-display 
    else{
        $(".request-type-display").html("Please Choose A Request Type");
        $(".request-type-display").css("background-color","#FF9393");

        //Switch Error Flag to Block
        validRequestFlag = false;
    }

});

//Day Mode Handler 
$("#day-mode").change(function(){

    globalDayMode = $("#day-mode").val();

    //When Day Mode is Not Selected
    if(globalDayMode == "Choose Day Mode"){

        $("#fromdate-box").hide();//Hide fromDate
        $("#fromdate").val("");//Reset FromDate

        $(".display-fromdate").html("Please Choose A Date");//Display Error Message
        $(".display-fromdate").css("background-color","#FF9393");

        $("#todate-box").hide();//Hide toDate
        $("#days-box").hide();//Hide days

        //Display Error Message
        $(".day-mode-display").html("Please Choose A Day Mode");
        $(".day-mode-display").css("background-color","#FF9393");

        //Set the validDayModeFlag to Block
        validDayModeFlag = false;
    }

    else{

        $("#fromdate-box").show();//Show FromDate
        $("#todate-box").hide();//Hide ToDate
        $("#days-box").hide();//Hide days

        //Set the validDayModeFlag to Clear
        validDayModeFlag = true;

        //Display the current Day Mode
        $(".day-mode-display").html("Your Selected Day Mode is "+ globalDayMode);
        $(".day-mode-display").css("background-color","rgba(0, 0, 255, 0.212)");

        //When Day Mode is Selected
        if(globalDayMode == "More Than a Day"){//When Day Mode is Half Day or Whole Day

            multipleDaysFlag = true;//Set the multipleDaysFlag to Clear

            //If FromDate is Set & Valid
            if(globalFromDateObject &&
               globalDayDifferenceFromDate < 120){
                   $("#todate-box").show();//Show ToDate
                   $("#todate").val("");//Reset ToDate

                   $(".display-todate").html("Please Choose A Date");//Display Error Message
                   $(".display-todate").css("background-color","#FF9393");
               }

            if(globalFromDateObject &&
               globalToDateObject &&
               (globalDayDifferenceFromDate < 120) &&
               (globalDayDifferenceToDate < 120)){
                
                //Display the Difference in Days
                $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+globalDayDifferenceToDate +"</strong> (Approx)");
                $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 

                validDatesFlag = true;//Set the global Flag to Clear
               }

               else{
                validDatesFlag = false;//Set the global Flag to Clear
               }
        }
        else{
            multipleDaysFlag = false;//Set the multipleDaysFlag to Block
        }

    }



});

//From Date Handler
$("#fromdate").change(function(){

    var fromdate = $("#fromdate").val();//retrieved value is string but in reverse 
    //pass dates to reverse
    fromdate = rev(fromdate);
    var dateElements = fromdate.split("-",3);
    //get dd , mm , yyyy separately
    globalFromDay = parseInt(dateElements[0]);
    globalFromMonth = parseInt(dateElements[1]);
    globalFromYear = parseInt(dateElements[2]);
    //pass to function to check which day it is
    var displayFromDate = dayofweek(globalFromDay, globalFromMonth, globalFromYear);//Set the Day To Display
    
    //convert the date back to original format (YYYY-MM-DD)
    fromdate = rev(fromdate);

    //Using Momentjs Object to check Validity of the Year of FromDate
    moment().format("YYYY-MM-DD");
    var currentDateObject = moment.utc();
    globalFromDateObject = moment.utc(fromdate);

    globalDayDifferenceFromDate = Math.abs(diffInDays(currentDateObject, globalFromDateObject)) + 2;//Including the FromDate value

    if(fromdate && //If a Date is selected
       (globalDayDifferenceFromDate < 120)){//If the date Year is Valid
        $(".display-fromdate").html("The Selected Day is "+ displayFromDate);
        $(".display-fromdate").css("background-color","rgba(0, 0, 255, 0.212)");
    
        //Switch Global Flag to set Clear
        validDatesFlag = true;
    
        //If More than A Day is Selected
        if(multipleDaysFlag){
            $("#todate-box").show();//Show ToDate
            $("#todate").val("");//Reset ToDate

            $(".display-todate").html("Please Choose A Date");//Show error message
            $(".display-todate").css("background-color","#FF9393");

            //Switch Global Flag to set Clear
            validDatesFlag = false;
            
        }
    }

    if(fromdate &&//if FromDate is Set
       (globalDayDifferenceFromDate > 120)){//If Selected Date is Beyond 4 Months
            //if dates are Invalid
            $(".display-fromdate").html("Invalid Dates Please Check the Dates Again !");
            $(".display-fromdate").css("background-color","#FF9393");
            
            //Set the Global Flag to Block
            validDatesFlag = false;

    }

    if(!fromdate){//If No date is Selected
        $(".display-fromdate").html("Please Choose A Date");
        $(".display-fromdate").css("background-color","#FF9393");

        //Hide ToDate
        $("#todate-box").hide();
        $("#todate").val("");//Reset ToDate
        $(".display-todate").html("");//Hide display ToDate
        $(".display-totaldays").html("");//Hide display TotalDays

        //Switch Global Flag to set Block
        validDatesFlag = false;
    }
});

//To Date Handler 
$("#todate").change(function(){

    var todate = $("#todate").val();
    //pass dates to reverse
    todate = rev(todate);
    var dateElements = todate.split("-",3);    
    globalToDay = parseInt(dateElements[0]);
    globalToMonth = parseInt(dateElements[1]);
    globalToYear = parseInt(dateElements[2])
    var displayToDate = dayofweek(globalToDay, globalToMonth, globalToYear);//Set the Day to Display

    //reverse todate again as  original format (YYYY-MM-DD)
    todate = rev(todate);

    //Set the format of Momentjs Date
    moment().format("YYYY-MM-DD");

    //Convert ToDate to UTC Standard momentjs object 
    var globalToDateObject = moment.utc(todate);

    //Get the Day Difference between FromDate & ToDate
    globalDayDifferenceToDate = Math.abs(diffInDays(globalFromDateObject, globalToDateObject)) + 1;//Including the FromDate value

   
    if(todate &&//If a Date is selected
       globalDayDifferenceToDate < 120){//If the Difference in From Date & To Date is Less than 120 Days(4 Months Gap)
        $(".display-todate").html("The Selected Day is "+ displayToDate);
        $(".display-todate").css("background-color","rgba(0, 0, 255, 0.212)");  
        
        if(globalFromYear &&//If FromDate is Set
           multipleDaysFlag)//If Mode is set to Multiple Days
        //Set the Global Flag to Clear
        validDatesFlag = true;

        else
        validDatesFlag = false;//Set the Global Flag to Block
     }
     if(!todate){//If No date is Selected
        $(".display-todate").html("Please Choose A Date");
        $(".display-todate").css("background-color","#FF9393");

        //Hide TotalDays 
        $(".display-totaldays").html("");

        if(multipleDaysFlag){//If multipleDaysFlag is SET
        //Set the Global Flag to Block 
        validDatesFlag = false;
        }
        
     }
 
     //check the validity of the entered Date
     if((globalDayDifferenceToDate > 120) || 
        (globalDayDifferenceToDate < 2) && 
        todate){
        //if dates are Invalid
        $(".display-todate").html("Invalid Date please Check the Date !");
        $(".display-todate").css("background-color","#FF9393"); 

        //Hide TotalDays 
        $(".display-totaldays").html("");

        //Set the Global Flag to Block
        validDatesFlag = false;
     }
     
     if(globalFromDateObject &&
        globalToDateObject &&
        (globalDayDifferenceToDate < 120) && 
        (globalDayDifferenceToDate > 1)){// If the dates are VALID
        
            $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+globalDayDifferenceToDate +"</strong> (Approx)");
            $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 

            //Set the Global Flag to Clear 
            validDatesFlag = true;
                
         }
 
});

//Days Event Handler
$("#days").on('input',function(){

    var days = $("#days").val();
    if (days == ""){
        $(".display-days").html("Please Enter Number of Working Days");
        $(".display-days").css("background-color","#FF9393"); 

        if(multipleDaysFlag){//If multipleDaysFlag is SET
            validWorkingDaysFlag = false;//Set the Global Error Flag to Block
        }
        
    }
    else{
        $(".display-days").html("You are applying for " + days + " Working Days");
        $(".display-days").css("background-color","rgba(0, 0, 255, 0.212)");
        
        validWorkingDaysFlag = true;//Set the Global Error Flag to Clear
    }
});

//Test Check Handler
$("#test-check").change(function(){

    if(!this.checked){
        $("#test-type-box").hide();//Hide Test Type
        
        if(globalTestType){
            $("#test-type").prop('selectedIndex',0);//Reset TestType
            validTestTypeFlag = false;// Set the global Flag to Clear
        }
        
        //Display Error Message
        $(".display-test-type").html("Please Specify the Exam");
        $(".display-test-type").css("background-color","#FF9393"); 

        testCheckFlag = false;//Set the Global Flag to FALSE

        validTestTypeFlag = true;// Set the global Flag to Clear
    }
    if(this.checked){

        $("#test-type-box").show();//Show Test Type

        testCheckFlag = true;//Set the Global Flag to FALSE

        //If there is Scheduled Test & Test type is Selected
        if($("#test-type").val() != "Choose Test Type ..."){
            //Set the global Flag to Clear
            validTestTypeFlag = true;
        }
        else{
            //Set the global Flag to Block
            validTestTypeFlag = false;
        }
           
    }

});

//Reason Category Handler
$("#reason-category").change(function(){
    if($("#reason-category").val() != "Choose Reason Category ..."){
        $("#reason-specific-box").show();
        var reasonCategory = $("#reason-category").val();
        $(".display-reason-category").html("Your selected Reason Category is " + reasonCategory);
        $(".display-reason-category").css("background-color","rgba(0, 0, 255, 0.212)"); 

        //Set the Global Error flag to Clear
        validReasonCategoryFlag = true;
    }
    else {
        $("#reason-specific-box").hide();
        $(".display-reason-category").html("Please Enter Reason Category");
        $(".display-reason-category").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validReasonCategoryFlag = false;
    }
});

//Arrear Count Handler
$("#arrearcount").on('input', function(){

    var arrearcount = $("#arrearcount").val();
    if(arrearcount == ""){
        $(".display-arrearcount").html("Please Enter Number of Arrears");
        $(".display-arrearcount").css("background-color","#FF9393");
        //Set the Global Error flag to Block
        validArrearCountFlag = false; 
    }
    else{
        $(".display-arrearcount").html("Your current Arrears are " + arrearcount);
        $(".display-arrearcount").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validArrearCountFlag = true;
    }
});

//Attendance Handler
$("#attendance").on('input', function(){

    var attendance = $("#attendance").val();
    var attendanceLevel = "";

    //Level Normal
    if (attendance >= 75 &&
        attendance <= 90){
        attendanceLevel = "Normal";
    }
    
    //Level High
    if(attendance > 90){
        attendanceLevel = "High";
    }

    //Level Low
    if(attendance <75 &&
        attendance >= 50){
            attendanceLevel = "Low";
    }

    //Level Critical
    if (attendance < 50){
        attendanceLevel = "CRITICAL";
    }

    //Attendance Validation
    if(attendance == ""){
        $(".display-attendance").html("Please Enter Your Attendance Percentage");
        $(".display-attendance").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validAttendanceFlag = false;
    }
    else{
        $(".display-attendance").html("Your Attendance Percentage is " + attendanceLevel);
        $(".display-attendance").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validAttendanceFlag = true;
    }
});

//Leave count Handler
$("#leave-count").on('input', function(){
    var leavecount = $("#leave-count").val();

    if(leavecount == ""){
        $(".display-leave-count").html("Please enter Number of Days leave taken earlier this Month");
        $(".display-leave-count").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        leavecount = false;
    }
    else{
        $(".display-leave-count").html("Your leave count is " + leavecount + " days");
        $(".display-leave-count").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        leavecount = true;
    }

});

//Reason Specific Handler
$("#reasonspecific").on('input', function(){

    if($.trim($("#reasonspecific").val()).length  < 1){//If the text field is EMPTY
        $(".display-reasonspecific").html("Please Specify your Reason");
        $(".display-reasonspecific").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validReasonSpecificFlag = false;
    }
    else{
        $(".display-reasonspecific").html("");
        $(".display-reasonspecific").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validReasonSpecificFlag = true;
    }

});

//Test Type Handler
$("#test-type").change(function(){

    var testType = $("#test-type").val();
    globalTestType = testType;
    if(testType != "Choose Test Type ..."){//If No TestType is selected
        $(".display-test-type").html("Your Selected Test Type is " + testType);
        $(".display-test-type").css("background-color","rgba(0, 0, 255, 0.212)"); 
        
        validTestTypeFlag = true;//Set the Global Error flag to Clear
    }
    else{
        $(".display-test-type").html("Please Specify the Exam");
        $(".display-test-type").css("background-color","#FF9393"); 

        if(testCheckFlag)//If Test Check is TICKED
        validTestTypeFlag = false;//Set the Global Error flag to Block
        else
        validTestTypeFlag = true;
    }

});

//////////////////////////////////// FORM SUBMISSION HANDLER //////////////////////////////////

$("#leave-form-btn").click(function(){
    if(validDatesFlag &&
       validRequestFlag &&
       validDayModeFlag &&
       validWorkingDaysFlag &&
       validReasonCategoryFlag &&
       validReasonSpecificFlag &&
       validTestTypeFlag &&
       validArrearCountFlag &&
       validAttendanceFlag &&
       validLeaveCountFlag){
           
        
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
        var studentArrearCount = $('#arrearcount').val();
        var studentAttendance = $('#attendance').val();
        var studentLeaveCount = $('#leave-count').val();
        var studentRequestStatus = 'submitted (CLASS TEACHER)';

        //Get Current Date
        debugger;
        var studentRequestDate = new Date();
        var dd = String(studentRequestDate.getDate()).padStart(2, '0');
        var mm = String(studentRequestDate.getMonth() + 1).padStart(2, '0');
        var yyyy = studentRequestDate.getFullYear();
        studentRequestDate = dd + '-' + mm + '-' + yyyy;

        //Store Request Data into a JS Object
        var studentRequestDataObject = {
            "arrearcount" : studentArrearCount,
            "attendance" : studentAttendance,
            "date" : studentRequestDate,
            "daymode" : studentDayMode,
            "fromdate" : studentFromDate,
            "leavecount" : studentLeaveCount,
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
    }

    else{

        //alert Failure
        alert("An Error Occured!");

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
