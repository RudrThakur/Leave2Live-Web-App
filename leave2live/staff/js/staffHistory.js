// Rudr Thakur

///////////////////////////////////// GLOBALS /////////////////////////////////////////////

//Global Row Indexes
var rowInd = 0, rowIndInProcess = 0, rowIndCancelled = 0, rowIndHistory = 0;

///////////  Session Handling ////////////////////

if (!localStorage.getItem("staffemail")) {
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
    $("#profile-staff-isclassteacherof").html(localStorage.getItem("staffisclassteacherof"));
    $("#profile-staff-isacoof").html(localStorage.getItem("staffisacoof"));
    $("#profile-staff-doj").html(localStorage.getItem("staffdoj"));
    $("#profile-staff-designation").html(localStorage.getItem("staffdesignation"));
    $("#profile-staff-address").html(localStorage.getItem("staffaddress"));

    function loadStaffRequests(){
        var staffRequestsRef = firebase.database().ref("staffrequests");

        //Display Leave Form Data From Firebase to Table

        staffRequestsRef.orderByChild('staffempno').on("value", function(snapshot) {
            snapshot.forEach(function(child) {
            
                var content = '';
            //Retrieve Request Data
            var tableData = child.val();

            rowInd = rowInd + 1;

            ////////////////////////////Get the Request Data of the Matched Record
            var tableRequestId = child.key;
            var tableRequestDate = tableData.staffdateofapplication;
            var tableLeaveNature = tableData.staffleavenature;
            var tableRequestFromDate = tableData.stafffromdate;
            var tableRequestToDate = tableData.stafftodate;
            var tableRequestStatus = tableData.status;

            ///////////////////////////////Display Request Data in Request-Table
            content += '<tr>';
            content += '<td>' + '<a href="staffHistoryDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';
            content += '<td>' + tableRequestDate + '</td>';
            content += '<td>' + tableLeaveNature + '</td>'; 
            content += '<td>' + tableRequestFromDate + '</td>';
            content += '<td>' + tableRequestToDate + '</td>';
            content += '<td>' + tableRequestStatus + '</td>';
            content += '</tr>';
            $('#staff-history-table').append(content);

            });
        });

    }

    loadStaffRequests();

}

