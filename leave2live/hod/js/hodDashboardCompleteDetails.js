//////////////// JS Handler for hodDashboardComplete.html
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


    //Add values to Profile Modal 
    // $("#profile-register-number").html(localStorage.getItem("registernumber"));
    // $("#profile-student-name").html(localStorage.getItem("studentname"));
    // $("#profile-dob").html(localStorage.getItem("dob"));
    // $("#profile-department").html(localStorage.getItem("department"));
    // $("#profile-classandsec").html(localStorage.getItem("classandsec"));
    // $("#profile-arrearcount").html(localStorage.getItem("arrearcount"));
    // $("#profile-email").html(localStorage.getItem("email"));
    // $("#profile-phone").html(localStorage.getItem("phone"));
    // $("#profile-leave-count").html(localStorage.getItem("leavecount"));

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