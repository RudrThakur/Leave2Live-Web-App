//////////////// JS Handler for index.html


/////////////////////////// GLOBALS //////////////////////////


//FromDate Globals
var globalFromDay, globalFromMonth, globalFromYear;

//ToDate Globals
var globalToDay, globalToMonth, globalToYear;

//Test Type Global 
var globalTestType;

//Global Total Number of Days
var totaldays;

//Global Flags
var oneDayFlag = 0;
var halfDayFlag = false;
var testCheckFlag = false;

//Error Flags 
var validRequestFlag = false;
var validDatesFlag = false;
var validWorkingDaysFlag = false;
var validReasonCategoryFlag = false;
var validReasonSpecificFlag = false;
var validArrearCountFlag = false;
var validAttendanceFlag = false;
var validLeaveHistoryFlag = false;
var validTestTypeFlag = true;


// Document Ready

$(document).ready(function(){

///////////////////////////////// Check Active Session ////////////////////
/*if (!localStorage.getItem("studentname")){
    window.location.href ='login.html';
    return false;
  }
  else{
    var registernumber = localStorage.getItem("registernumber");
    var studentname = localStorage.getItem("studentname");
    var classandsec = localStorage.getItem("classandsec");
    var requestid = localStorage.getItem("requestid");
    var absentdays = localStorage.getItem("absentdays");
      $("#registernumber").val(registernumber);
      $("#studentname").val(studentname);
      $("#classandsec").val(classandsec);
      $("#requestid").val(requestid);
      $("#absentdays").val(absentdays);

  }*/

///////////////////////////////// Initial Validations /////////////////////

    //Initial Validation Leave Form

    if($("#request-type").val() == "Choose Request Type ..."){//Request Type 
        $(".request-type-display").html("Please Choose A Request Type");
        $(".request-type-display").css("background-color","#FF9393");
    }

    if(!$("#fromdate").val()){//From Date
        $(".display-fromdate").html("Please Choose A Date");
        $(".display-fromdate").css("background-color","#FF9393");
      
    }
    if(!$("#todate").val()){// To Date
        $(".display-todate").html("Please Choose A Date");
        $(".display-todate").css("background-color","#FF9393");

    }

    if(!$("#days").val()){// Number of Working Days
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

    //Leave History
    if(!$("#leave-history").val()){
        $(".display-leave-history").html("Please Enter Number of Days leave taken earlier");
        $(".display-leave-history").css("background-color","#FF9393");
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


//function to check the validity of entered date value

function checkDateValidity (date1){
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    if(currentYear - date1 != 0 ){
            return 0;// return false if date Not Valid
       }    
    else{
        return 1;//return true if date Valid
    }
}

/////////////////////////// Event Handlers ////////////////////


//Request Type Handler
$("#request-type").change(function(){
    var requestType = $("#request-type").val();
    if(requestType != "Choose Request Type ..."){
        //show request type
        $(".request-type-display").html("Your current RequestType is "+ requestType);
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

//One Day Check Handler
$("#oneday-check").change(function(){
    
    if(this.checked){// If oneDay Checkbox TRUE
        oneDayFlag = 1;
        $("#todate").prop( "disabled", true );//disable ToDate
        $("#halfday-check-box" ).hide();//Hide Half Day Check Box
        $("#days").val(1);// set Days value to 1
        $(".display-days").hide();//hide DisplayDays
        $("#days").prop("disabled",true);//disable WorkingDays
        $("#todate").val("");//Reset ToDate
        globalToYear = null;
        globalToDay = null;
        globalToMonth = null;
        $(".display-todate").html("");
        $(".display-totaldays").html("");
        $(".display-onedaycheck").html("You Have Selected Application For A SINGLE DAY");
        $(".display-onedaycheck").css("background-color","rgba(0, 0, 255, 0.212)");

        //Set Number Of Working Days Flag to Clear
        validWorkingDaysFlag = true;

        if(fromdate &&
           checkDateValidity(globalFromYear)){//If a Date is selected

            //Set the Global Flag to Clear
            validDatesFlag = true;
        }

        else{
            //Set the Global Flag to Block
            validDatesFlag = false;
        }
    } 
    else{ // If oneDay Checkbox FALSE
        oneDayFlag = 0;
        $("#days").val("");// set Days value to 1
        $("#days").prop("disabled",false);//disable WorkingDays
        $("#halfday-check-box" ).show();//Show Half Day Check Box
        $(".display-days").show();//show DisplayDays

        //disable ToDate
        $( "#todate" ).prop( "disabled", false );

        //Set Number Of Working Days Flag to Block
        validWorkingDaysFlag = false;

        if($("#todate").val()){//If ToDate is Set
            $(".display-todate").html("The Selected Day is "+ displayToDate);
            $(".display-todate").css("background-color","rgba(0, 0, 255, 0.212)");

        }
        else{//If ToDate is not Set
            $(".display-todate").html("Please Choose A Date");
            $(".display-todate").css("background-color","#FF9393");

            //Set the Global Flag to Block
            validDatesFlag = false;
        }
        
        $(".display-onedaycheck").html("");//Nullify oneDay Display

        // If oneDay Checkbox FALSE display Number of Days
            if($("#fromdate").val() &&
                $("#todate").val()){// If both FromDate and ToDate are Set
             totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 ) + 1;


             if(totaldays < 2 ){// If ToDate is earlier than FromDate Raise Error
             $(".display-totaldays").html("Invalid Dates Please Check the Dates Again !");
             $(".display-totaldays").css("background-color","#FF9393"); 

             //Set the Global Flag to Block
             validDatesFlag = false;

             }
             else{// If Dates are Valid
                $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)");

                //Set the Global Flag to Clear
                validDatesFlag = true;
             }
  
         }
        }
});

//Half Day Check Handler 
$("#halfday-check").change(function(){

    //If Halfday Checkbox is CHECKED
    if(this.checked){
        halfDayFlag = true;//set Global Flag to True
        $("#oneday-check-box").hide();//Hide oneday check
        $("#days-box").hide();//Hide Number of Working days Box
        $("#todate-box").hide();//Hide ToDate Box

        //Display Span text Message 
        $(".display-halfdaycheck").html("You Have Selected Application For HALF DAY");
        $(".display-halfdaycheck").css("background-color","rgba(0, 0, 255, 0.212)");

        if(fromdate &&
            checkDateValidity(globalFromYear)){//If a Date is selected
 
             //Set the Global Flag to Clear
             validDatesFlag = true;
         }
 
        else{
            //Set the Global Flag to Block
            validDatesFlag = false;
        }

        //Set Number Of Working Days Flag to Clear
        validWorkingDaysFlag = true;

         

    }

    //If Halfday Checkbox is NOT CHECKED
    else{
        halfDayFlag = false;// set Global Flag to False
        $("#oneday-check-box").show();//Show oneday check
        $("#days-box").show();//Show Number of Working days Box
        $("#todate-box").show();//Show ToDate Box

        //Set Number of Working Days Flag to Block
        validWorkingDaysFlag = false;

        //Hide Span text Message 
        $(".display-halfdaycheck").html("");
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
    var displayFromDate = dayofweek(globalFromDay, globalFromMonth, globalFromYear);
 
    if(fromdate &&
       checkDateValidity(globalFromYear)){//If a Date is selected
        $(".display-fromdate").html("The Selected Day is "+ displayFromDate);
        $(".display-fromdate").css("background-color","rgba(0, 0, 255, 0.212)");

        //When one Day Flag is Set
        if(oneDayFlag ||
           halfDayFlag)
        validDatesFlag = true;//Set the Global Flag to Clear
        else //When the one Day Flag is NOT SET
        validDatesFlag = false;//Set the Global Flag to Block

    }
    if(!fromdate){//If No date is Selected
        $(".display-fromdate").html("Please Choose A Date");
        $(".display-fromdate").css("background-color","#FF9393");

        //Switch Global Flag to set Block
        validDatesFlag = false;
    }

    //check the validity of the entered Date
    if(!checkDateValidity(globalFromYear) && 
       fromdate ){
        //if dates are Invalid
        $(".display-fromdate").html("Invalid Dates Please Check the Dates Again !");
        $(".display-fromdate").css("background-color","#FF9393");
        
        //Set the Global Flag to Block
        validDatesFlag = false;
    }
    
    if(checkDateValidity(globalFromYear) && 
       checkDateValidity(globalToYear) && 
       $("#fromdate").val() &&
       $("#todate").val()){// If the dates are VALID and oneDAY not Checked
            totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 ) + 1;
            if(totaldays < 2 ){// If ToDate is earlier than FromDate Raise Error
                $(".display-totaldays").html("<br><br>Invalid Dates Please Check the Dates Again !");
                $(".display-totaldays").css("background-color","#FF9393"); 

                //Set the Global Flag to Block
                validDatesFlag = false;
   
                }
                else{// If Dates are Valid
                   $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                   $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 

                   //Set the Global Flag to Clear
                   validDatesFlag = true;
                }
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
    var displayToDate = dayofweek(globalToDay, globalToMonth, globalToYear);
   
    if(todate &&
        checkDateValidity(globalToYear)){//If a Date is selected
         $(".display-todate").html("The Selected Day is "+ displayToDate);
         $(".display-todate").css("background-color","rgba(0, 0, 255, 0.212)");    
     }
     if(!todate){//If No date is Selected
         $(".display-todate").html("Please Choose A Date");
         $(".display-todate").css("background-color","#FF9393");

         //Set the Global Flag to Block 
         validDatesFlag = false;
     }
 
     //check the validity of the entered Date
     if(!checkDateValidity(globalToYear) && 
        todate){
         //if dates are Invalid
         $(".display-todate").html("<br><br>Invalid Date please Check the Date !");
         $(".display-todate").css("background-color","#FF9393"); 

         //Set the Global Flag to Block
         validDatesFlag = false;
     }
     
     if(checkDateValidity(globalFromYear) && 
        checkDateValidity(globalToYear) && 
        $("#fromdate").val() &&
        $("#todate").val()){// If the dates are VALID and oneDAY not Checked
             totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 ) + 1;
             if(totaldays < 2 ){// If ToDate is earlier than FromDate Raise Error
                $(".display-totaldays").html("<br><br>Invalid Dates Please Check the Dates Again !");
                $(".display-totaldays").css("background-color","#FF9393"); 

                //Set the Global Flag to Block
                validDatesFlag = false;
   
                }
                else{// If Dates are Valid
                   $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                   $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 

                   //Set the Global Flag to Clear 
                   validDatesFlag = true;
                }
         }
 
});

//Days Event Handler
$("#days").on('input',function(){

    var days = $("#days").val();
    if (days == ""){
        $(".display-days").html("Please Enter Number of Working Days");
        $(".display-days").css("background-color","#FF9393"); 

        if(oneDayFlag ||
           halfDayFlag)
        validWorkingDaysFlag = true;//Set the Global Error flag to Clear
        else
        validWorkingDaysFlag = false;//Set the Global Error Flag to Block
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

        //Set the global Flag to Block
        testCheckFlag = false;

        //If Test Check is SET & Test Type is Valid
        if(testCheckFlag &&
           globalTestType){
               //Set the Global Flag to Clear
               validTestTypeFlag = true;
           }

           else
           validTestTypeFlag = false;// Set the global Flag to Block
    }
    if(this.checked){
        $("#test-type-box").show();//Show Test Type

        //Set the global flag to Clear
        testCheckFlag = true;

        //If there is Scheduled Test & Test type is Selected
        if(testCheckFlag &&
           globalTestType){
               //Set the global Flag to Clear
               validTestTypeFlag = true;
        }
        else
        validTestTypeFlag = false;//Set the global Flag to Block
           
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

//Leave History Handler
$("#leave-history").on('input', function(){
    var leaveHistory = $("#leave-history").val();

    if(leaveHistory == ""){
        $(".display-leave-history").html("Please enter Number of Days leave taken earlier");
        $(".display-leave-history").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validLeaveHistoryFlag = false;
    }
    else{
        $(".display-leave-history").html("Your leave history is " + leaveHistory + " days");
        $(".display-leave-history").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validLeaveHistoryFlag = true;
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
    if(testType != "Choose Test Type ..."){
        $(".display-test-type").html("Your Selected Test Type is " + testType);
        $(".display-test-type").css("background-color","rgba(0, 0, 255, 0.212)"); 
        if(testCheckFlag)//If Test Check is TICKED
        validTestTypeFlag = true;//Set the Global Error flag to Clear
    }
    else{
        $(".display-test-type").html("Please Specify the Exam");
        $(".display-test-type").css("background-color","#FF9393"); 

        if(!testCheckFlag)//If Test Check is NOT TICKED
        validTestTypeFlag = false;//Set the Global Error flag to Block
    }

});

//////////////////////////////////// FORM SUBMISSION HANDLER //////////////////////////////////

$("#leave-form-btn").click(function(){

    debugger;
    if(validDatesFlag &&
       validRequestFlag &&
       validWorkingDaysFlag &&
       validReasonCategoryFlag &&
       validReasonSpecificFlag &&
       validTestTypeFlag &&
       validArrearCountFlag &&
       validAttendanceFlag &&
       validLeaveHistoryFlag){
           alert("All Clear");
    }
    else{
        alert("An Error Occured!");
        
    }
});

});