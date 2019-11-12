//  Session Handling ////////////////////

if (!localStorage.getItem("hodemail")) {

    //Redirect to login page If New User
    window.location.href = '../login.html';
} else {

    //Global Row Indexes
    var rowInd = 0,
        rowIndInProcess = 0,
        rowIndCancelled = 0,
        rowIndHistory = 0;

    //////////////////////////////////// Loading HOD Profile ///////////////////////////

    //Add values to HOD Profile Modal 
    $("#profile-hod-email").html(localStorage.getItem("hodemail"));
    $("#profile-hod-name").html(localStorage.getItem("hodname"));
    $("#profile-hod-phone").html(localStorage.getItem("hodphone"));
    $("#profile-hod-department").html(localStorage.getItem("hoddepartment"));
    $("#profile-hod-staffid").html(localStorage.getItem("hodstaffid"));
    $("#profile-hod-isacoof").html(localStorage.getItem("hodisacoof"));
    $("#profile-hod-isclassteacherof").html(localStorage.getItem("hodisclassteacherof"));



    //Get Database Reference
    var hodDashboardRef = firebase.database().ref("staffrequests");

    /////////////////////////////////// New Requests 

    hodDashboardRef.orderByChild("status").equalTo("submitted(HOD)").once("value", function (snapshot) {
        snapshot.forEach(function (child) {

            var content = '';

            //Retrieve Request Data
            var tableData = child.val();

            rowInd = rowInd + 1;

            ////////////////////////////Get the Request Data of the Matched Record
            var tableRequestId = child.key;
            var tableFromDate = tableData.stafffromdate;
            var tableToDate = tableData.stafftodate;
            var tableLeaveNature = tableData.staffleavenature;
            var tableWorkNature = tableData.staffworknature;
            var tableDateOfApplication = tableData.staffdateofapplication;
            var currentStatus = tableData.status;

            ///////////////////////////////Display Request Data in Request-Table
            content += '<tr>';
            content += '<td>' + '<a href="staffRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>'; //Column RequestID
            content += '<td>' + tableDateOfApplication + '</td>';
            content += '<td>' + tableFromDate + '</td>';
            content += '<td>' + tableToDate + '</td>';
            content += '<td>' + tableLeaveNature + '</td>';
            content += '<td>' + tableWorkNature + '</td>';
            content += '<td>' + currentStatus + '</td>';
            content += '</tr>';
            $('#staff-leave-table-new').append(content);

        });

    });

      /////////////////////////////////// Approved Requests 

      hodDashboardRef.orderByChild("status").equalTo("approved(HOD)").once("value", function (snapshot) {
        snapshot.forEach(function (child) {

            var content = '';

            //Retrieve Request Data
            var tableData = child.val();

            rowInd = rowInd + 1;

            ////////////////////////////Get the Request Data of the Matched Record
            var tableRequestId = child.key;
            var tableFromDate = tableData.stafffromdate;
            var tableToDate = tableData.stafftodate;
            var tableLeaveNature = tableData.staffleavenature;
            var tableWorkNature = tableData.staffworknature;
            var tableDateOfApplication = tableData.staffdateofapplication;
            var currentStatus = tableData.status;

            ///////////////////////////////Display Request Data in Request-Table
            content += '<tr>';
            content += '<td>' + '<a href="staffRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>'; //Column RequestID
            content += '<td>' + tableDateOfApplication + '</td>';
            content += '<td>' + tableFromDate + '</td>';
            content += '<td>' + tableToDate + '</td>';
            content += '<td>' + tableLeaveNature + '</td>';
            content += '<td>' + tableWorkNature + '</td>';
            content += '<td>' + currentStatus + '</td>';
            content += '</tr>';
            $('#staff-leave-table-approved').append(content);

        });

    });

      /////////////////////////////////// Cancelled Requests 

      hodDashboardRef.orderByChild("status").equalTo("cancelled(HOD)").once("value", function (snapshot) {
        snapshot.forEach(function (child) {

            var content = '';

            //Retrieve Request Data
            var tableData = child.val();

            rowInd = rowInd + 1;

            ////////////////////////////Get the Request Data of the Matched Record
            var tableRequestId = child.key;
            var tableFromDate = tableData.stafffromdate;
            var tableToDate = tableData.stafftodate;
            var tableLeaveNature = tableData.staffleavenature;
            var tableWorkNature = tableData.staffworknature;
            var tableDateOfApplication = tableData.staffdateofapplication;
            var currentStatus = tableData.status;

            ///////////////////////////////Display Request Data in Request-Table
            content += '<tr>';
            content += '<td>' + '<a href="staffRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>'; //Column RequestID
            content += '<td>' + tableDateOfApplication + '</td>';
            content += '<td>' + tableFromDate + '</td>';
            content += '<td>' + tableToDate + '</td>';
            content += '<td>' + tableLeaveNature + '</td>';
            content += '<td>' + tableWorkNature + '</td>';
            content += '<td>' + currentStatus + '</td>';
            content += '</tr>';
            $('#staff-leave-table-declined').append(content);

        });

    });


}

    //When Logout button is Clicked
    function logout() {

        localStorage.clear();
        //Go back to Login Page
        window.location.href = '../login.html';
    };