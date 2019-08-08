//////////////// JS Handler for requestDetails.html
// Rudr Thakur

/////////////////  Session Handling ////////////////////

if (!localStorage.getItem("staffemail")) {

    //Redirect to login page If New User
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

}

////////////////////////////////////////////// Functions ///////////////////////////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}

/////////////////////////////////////// Data Retrieval From Firebase ////////////////////////////

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
        $("#request-date-details").html(rev(detailRequestData.date));
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
    window.location.href ='../staff/staffDashboard.html';
});

//When an Action Button is Clicked

////////////////////////////////// Update Firebase Data

//Approve Request
$("#approve-btn").click(function(){

    $("#status-details").hide();
    $("#updating-message").show();

    setTimeout(function(){
        //Set the status of the Request as SUBMITTED
        detailRequestRef.child(queryRequestId).update({status : "submitted (HOD)"});
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
});


//Deny Request
$("#deny-btn").click(function(){

    $("#status-details").hide();
    $("#updating-message").show();

    setTimeout(function(){
        //Set the status of the Request as CANCELLED
        detailRequestRef.child(queryRequestId).update({status : "cancelled (CLASS TEACHER)"});
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
    
});