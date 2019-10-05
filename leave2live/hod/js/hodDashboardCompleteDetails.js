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