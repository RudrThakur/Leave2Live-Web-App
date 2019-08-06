////////////////////////////////JS Handler for staffDashboard.html
// Rudr Thakur

///////////////////////////////////// GLOBALS /////////////////////////////////////////////

//Global Row Indexes
var rowInd = 0, rowIndInProcess = 0, rowIndCancelled = 0, rowIndHistory = 0;

//  Session Handling ////////////////////

if (!localStorage.getItem("staffemail")) {
    window.location.href = 'login.html';

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


//////////////////////////////////////////////// Data Retrieval ////////////////////////////////


//Get Database Reference
var staffDashboardRef = firebase.database().ref("requests");

//Display Leave Form Data From Firebase to Table

/////////////////////////////////// New Requests 

staffDashboardRef.orderByChild("status").equalTo("submitted (CLASS TEACHER)").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;

    ///////////////////////////////Display Request Data in Request-Table
    content += '<tr>';
    content += '<td>' + '<a href="requestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
    content += '<td>' + tableRequestType + '</td>';//Column RequestType
    content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
    content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
    content += '<td>' + tableDayMode + '</td>';//Column Day Mode
    content += '</tr>';
    $('#new-requests-table').append(content);

    });
});

///////////////////////////// In Process Requests

staffDashboardRef.orderByChild("status").equalTo("submitted (HOD)").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;

    ///////////////////////////////Display Request Data in Request-Table
    content += '<tr>';
    content += '<td>' + '<a href="requestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
    content += '<td>' + tableRequestType + '</td>';//Column RequestType
    content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
    content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
    content += '<td>' + tableDayMode + '</td>';//Column Day Mode
    content += '</tr>';
    $('#inprocess-requests-table').append(content);

    });
});

///////////////////////////// Cancelled Requests

staffDashboardRef.orderByChild("status").equalTo("cancelled (CLASS TEACHER)").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;

    ///////////////////////////////Display Request Data in Request-Table
    content += '<tr>';
    content += '<td>' + '<a href="requestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
    content += '<td>' + tableRequestType + '</td>';//Column RequestType
    content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
    content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
    content += '<td>' + tableDayMode + '</td>';//Column Day Mode
    $('#cancelled-requests-table').append(content);

    });
});

///////////////////////////// History

staffDashboardRef.orderByKey().once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;

    ///////////////////////////////Display Request Data in Request-Table
    content += '<tr>';
    content += '<td>' + '<a href="requestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
    content += '<td>' + tableRequestType + '</td>';//Column RequestType
    content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
    content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
    content += '<td>' + tableDayMode + '</td>';//Column Day Mode
    content += '</tr>';
    $('#history-requests-table').append(content);

    });
});

$("")