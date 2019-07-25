//////////////// JS Handler for index.html


/////////////////////////// GLOBALS //////////////////////////


//FromDate Globals
var globalFromDay, globalFromMonth, globalFromYear;

//ToDate Globals
var globalToDay, globalToMonth, globalToYear;

//Total Number of Days
var totaldays, halfDayFlag = 0;


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


//Getting current request type and displaying below the select drop down
$("#request-type").click(function(){
    var requestType = $("#request-type").val();
    if(requestType != "Choose Request Type ..."){
        //show request type
        $(".request-type-display").html("Your current RequestType is "+ requestType);
        $(".request-type-display").css("background-color","rgba(0, 0, 255, 0.212)");

    }
    //hide request-type-display 
    else{
        $(".request-type-display").html("Please Choose A Request Type");
        $(".request-type-display").css("background-color","#FF9393");
    }

});

//Half Day Check Handler

$("#halfday-check").change(function(){
    
    if(this.checked){// If halfDay Checkbox TRUE
        halfDayFlag = 1;
        $( "#todate" ).prop( "disabled", true );//disable ToDate
        $("#days").val(1);// set Days value to 1
        $(".display-days").hide();//hide DisplayDays
        $("#days").prop("disabled",true);//disable WorkingDays
        $("#todate").val(""); 
        globalToYear = null;
        globalToDay = null;
        globalToMonth = null;
        $(".display-todate").html("");
        $(".display-totaldays").html("");
        $(".display-halfdaycheck").html("You Have Selected Application For A HALF DAY");
        $(".display-halfdaycheck").css("background-color","rgba(0, 0, 255, 0.212)");

    } 
    else{ // If halfDay Checkbox FALSE
        halfDayFlag = 0;
        $("#days").val("");// set Days value to 1
        $("#days").prop("disabled",false);//disable WorkingDays
        $(".display-days").show();//show DisplayDays

        //disable ToDate
        $( "#todate" ).prop( "disabled", false );

        if($("#todate").val()){//If ToDate is Set
            $(".display-todate").html("The Selected Day is "+ displayToDate);
            $(".display-todate").css("background-color","rgba(0, 0, 255, 0.212)");

        }
        else{//If ToDate is not Set
            $(".display-todate").html("Please Choose A Date");
            $(".display-todate").css("background-color","#FF9393");
        }
        
        $(".display-halfdaycheck").html("");//Nullify HalfDay Display

        // If halfDay Checkbox FALSE display Number of Days
            if($("#fromdate").val() &&
                $("#todate").val()){// If both FromDate and ToDate are Set
             totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 );


             if(totaldays < 0 ){// If ToDate is earlier than FromDate Raise Error
             $(".display-totaldays").html("Invalid Dates Please Check the Dates Again !");
             $(".display-totaldays").css("background-color","#FF9393"); 

             }
             else{// If Dates are Valid
                $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 
             }
  
         }
        }
    
});

//get fromdate 
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

    }
    if(!fromdate){//If No date is Selected
        $(".display-fromdate").html("Please Choose A Date");
        $(".display-fromdate").css("background-color","#FF9393");
    }


    //check the validity of the entered Date
    if(!checkDateValidity(globalFromYear) && 
       fromdate ){
        //if dates are Invalid
        $(".display-fromdate").html("Invalid Date please Check the Date !");
        $(".display-fromdate").css("background-color","#FF9393"); 
    }
    
    if(checkDateValidity(globalFromYear) && 
       checkDateValidity(globalToYear) && 
       $("#fromdate").val() &&
        $("#todate").val() ){// If the dates are VALID and HALFDAY not Checked
            totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 );
            if(totaldays < 0 ){// If ToDate is earlier than FromDate Raise Error
                $(".display-totaldays").html("<br><br>Invalid Dates Please Check the Dates Again !");
                $(".display-totaldays").css("background-color","#FF9393"); 
   
                }
                else{// If Dates are Valid
                   $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                   $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 
                }
        }

    });

//get todate 
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
     }
 
 
     //check the validity of the entered Date
     if(!checkDateValidity(globalToYear) && 
        todate){
         //if dates are Invalid
         $(".display-todate").html("<br><br>Invalid Date please Check the Date !");
         $(".display-todate").css("background-color","#FF9393"); 
     }
     
     if(checkDateValidity(globalFromYear) && 
        checkDateValidity(globalToYear) && 
        $("#fromdate").val() &&
        $("#todate").val()){// If the dates are VALID and HALFDAY not Checked
             totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 );
             if(totaldays < 0 ){// If ToDate is earlier than FromDate Raise Error
                $(".display-totaldays").html("<br><br>Invalid Dates Please Check the Dates Again !");
                $(".display-totaldays").css("background-color","#FF9393"); 
   
                }
                else{// If Dates are Valid
                   $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                   $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 
                }
         }
 
});

//Days Event Handler

$("#days").change(function(){





});

//Test Check Handler

$("#test-check").change(function(){
    if(!this.checked){
        $("#test-type-box").hide();//Hide Test Type
    }
    if(this.checked){
        $("#test-type-box").show();//Show Test Type
    }

});

//Reason Category Handler

$("#reason-category").change(function(){
    if($("#reason-category").val() != "Choose Reason Category ...")
        $("#reason-specific-box").show();
    else 
        $("#reason-specific-box").hide();
});


});