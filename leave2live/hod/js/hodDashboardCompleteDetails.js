//////////////// JS Handler for hodDashboardCompleteDetails.html
// Rudr Thakur

////////////////////////////////////////////// Functions ///////////////////////////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}

/////////////////////////////////////// Data Retrieval From Firebase ////////////////////////////

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


var detailRequestRef = firebase.database().ref("requests");

//Get current URL
var queryUrl = new URL(window.location.href);

//Fetch queryId
var queryRequestId = queryUrl.searchParams.get("queryid");


//Retrieve Record from firebase of matching RequestId

detailRequestRef.orderByKey().equalTo(queryRequestId).on("value", function(snapshot){

    snapshot.forEach(function(child) {

        //Retrieve Request Data
        var detailRequestData = child.val();


        ///////////////////////////Display Data in the Request Details Modal
        $("#requestid-details").html(child.key);
        $("#request-type-details").html(detailRequestData.requesttype);
        $("#request-date-details").html(detailRequestData.date);
        $("#fromdate-details").html(rev(detailRequestData.fromdate));
        $("#todate-details").html(rev(detailRequestData.todate));
        $("#day-mode-details").html(detailRequestData.daymode);
        $("#test-check-details").html(detailRequestData.testcheck);
        $("#test-type-details").html(detailRequestData.testtype);
        $("#reason-category-details").html(detailRequestData.reasoncategory);
        $("#reason-specific-details").html(detailRequestData.reasonspecific);
        $("#arrear-count-details").html(detailRequestData.arrearcount);
        $("#attendance-details").html(detailRequestData.attendance);
        $("#leave-count-details").html(detailRequestData.leavecount);
        $("#status-details").html(detailRequestData.status);
 
    });
});
 

//When back button is Clicked
$("#back-btn").click(function(){

    //Go back to Previous Page
    window.location.href ='studentLeave.html';
});


//When an Action Button is Clicked

////////////////////////////////// Update Firebase Data

//Approve Request
$("#hod-approve-btn").click(function(){

    var getCurrentStatusRef = firebase.database().ref("requests/" + queryRequestId);
    var currentStatus;
    getCurrentStatusRef.once('value').then(function(snapshot){
    currentStatus = snapshot.child("status").val();

    $("#status-details").hide();
    $("#updating-message").show();

    if(currentStatus == "submitted(HOD)"){

    setTimeout(function(){
        //Set the status of the Request as SUBMITTED

            detailRequestRef.child(queryRequestId).update({status : "approved(HOD)"});
  
        //Show Success Message
        $("#action-success-message").fadeIn(1000);
    }, 5000);

    //Hide after 5 seconds
    setTimeout(function() { 
        $("#updating-message").hide();
        $("#action-success-message").fadeOut(); 
    }, 5000);

    //Hide after 5 seconds
    setTimeout(function() { 
        //reload the page
        location.reload();
        $("#status-details").show();
    }, 7000);

    }

    else{
        setTimeout(function() { 
            $("#updating-message").hide();
            $("#action-failure-message").fadeIn(); 
        }, 5000);
      
        //Hide after 5 seconds
        setTimeout(function() { 
            //reload the page
            $("#action-failure-message").fadeOut();
            $("#status-details").show();
        }, 7000)
    }

    });
});

//Deny Request
$("#hod-deny-btn").click(function(){
    
    var getCurrentStatusRef = firebase.database().ref("requests/" + queryRequestId);
    var currentStatus;
    getCurrentStatusRef.once('value').then(function(snapshot){
    currentStatus = snapshot.child("status").val();
    });

    $("#status-details").hide();
    $("#updating-message").show();

    if (currentStatus == "submitted("+ localStorage.getItem("staffRole") + ")" ||
        currentStatus == "cancelled("+ localStorage.getItem("staffRole") + ")"){

        setTimeout(function(){
            //Set the status of the Request as CANCELLED
            if(localStorage.getItem("staffRole") == "CLASS TEACHER")
                detailRequestRef.child(queryRequestId).update({status : "cancelled(ACO)"});
            if(localStorage.getItem("staffRole") == "ACO")
                detailRequestRef.child(queryRequestId).update({status : "cancelled(HOD)"});
            //Show Success Message
            $("#action-success-message").fadeIn(1000);
        }, 5000);
    
        //Hide after 5 seconds
        setTimeout(function() { 
            $("#updating-message").hide();
            $("#action-success-message").fadeOut(); 
        }, 5000);

        //Hide after 5 seconds
        setTimeout(function() { 
            //reload the page
            location.reload();
            $("#status-details").show();
        }, 7000)

    }

    else{
        setTimeout(function() { 
            $("#updating-message").hide();
            $("#action-failure-message").fadeIn(); 
        }, 5000);
      
        //Hide after 5 seconds
        setTimeout(function() { 
            //reload the page
            $("#action-failure-message").fadeOut();
            $("#status-details").show();
        }, 7000)
    }
    
});