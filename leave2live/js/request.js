//////////////// JS Handler for request.html

//Get Database Reference
var tableRequest = firebase.database().ref("requests");
$(document).ready(function(){

//  Session Handling ////////////////////

if (!localStorage.getItem("registernumber")) {
    window.location.href = 'login.html';
    return false;

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
    $("#profile-leave-history").html(localStorage.getItem("leavehistory"));

}

////////////////////////////////////////////// Functions ///////////////////////////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}



//////////////////////////////////////////////// Data Retrieval ////////////////////////////////

//Display Leave Form Data From Firebase to Table

tableRequest.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      var content = '';
        //Retrieve Request Data
        var tableData = child.val();
        var tableRegisterNumber = tableData.registernumber;
     

        if(tableRegisterNumber == localStorage.getItem("registernumber")){

            ////////////////////////////Get the Request Data of the Matched Record
            var tableRequestId = child.key;
            var tableRequestType = tableData.requesttype;
            var tableRequestDate = tableData.date;
            var tableReasonCategory = tableData.reasoncategory;
            var tableStatus = tableData.status;
            var dayModeDetails = tableData.daymode;
            var fromdateDetails = tableData.fromdate;
            var todateDetails = tableData.todate;
            var testCheckDetails = tableData.testcheck;
            var testTypeDetails = tableData.testtype;
            var reasonSpecificDetails = tableData.reasonspecific;
            var arrearCountDetails = tableData.arrearcount;
            var attendanceDetails = tableData.attendance;
            var leaveHistoryDetails = tableData.leavehistory;

            ///////////////////////////////Display Request Data in Request-Tavble
            content += '<tr>';
            content += '<td>' + '<a href="#" data-toggle="modal" data-target="#request-details">' + tableRequestId + '</a>' + '</td>';//Column RequestID
            content += '<td>' + tableRequestType + '</td>';//Column RequestType
            content += '<td>' + rev(tableRequestDate) + '</td>'; //Column RequestDate
            content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
            content += '<td>' + tableStatus + '</td>';//Column Status
            content += '</tr>';
            $('#request-table').append(content);

            ///////////////////////////Display Data in the Request Details Modal
            $("#requestid-details").html(tableRequestId);
            $("#request-type-details").html(tableRequestType);
            $("#request-date-details").html(rev(tableRequestDate));
            $("#fromdate-details").html(rev(fromdateDetails));
            $("#todate-details").html(rev(todateDetails));
            $("#day-mode-details").html(dayModeDetails);
            $("#test-check-details").html(testCheckDetails);
            $("#test-type-details").html(testTypeDetails);
            $("#reason-category-details").html(tableReasonCategory);
            $("#reason-specific-details").html(reasonSpecificDetails);
            $("#arrear-count-details").html(arrearCountDetails);
            $("#attendance-details").html(attendanceDetails);
            $("#leave-history-details").html(leaveHistoryDetails);
            $("#status-details").html(tableStatus);
        }
  
    });
  });




});

