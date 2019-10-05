////////////////////////////////JS Handler for studentLeave.html
// Rudr Thakur

///////////////////////////////////// GLOBALS /////////////////////////////////////////////

//Global Row Indexes
var rowInd = 0, rowIndInProcess = 0, rowIndCancelled = 0, rowIndHistory = 0;

///////////  Session Handling ////////////////////

if (!localStorage.getItem("hodemail")) {
    window.location.href = '../login.html';

} 
else {
   
    //////////////////////////////////// Loading HOD Profile ///////////////////////////

    //Add values to Staff Profile Modal 
    $("#profile-hod-email").html(localStorage.getItem("hodemail"));
    $("#profile-hod-name").html(localStorage.getItem("hodname"));
    $("#profile-hod-phone").html(localStorage.getItem("hodphone"));
    $("#profile-hod-department").html(localStorage.getItem("hoddepartment"));
}


// Get the element with id="defaultOpen" and click on it

document.getElementById("defaultOpen").click();

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

studentLeaveRequestsRef = firebase.database().ref("requests");


////////////////////////// NEW REQUESTS (LEAVE) - STUDENTS ///////////////////////////////////
studentLeaveRequestsRef.orderByChild("status").equalTo("submitted(HOD)").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRegisterNumber = tableData.registernumber;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;
    var tableStudentName;

    if(tableRequestType == "leave"){
        ////////////////////////////////Join Requests table and Students table using Register Number

        //reference to table - students
        tableStudentsDataRef = firebase.database().ref("students");

        tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                tableStudentName = snap.val().studentname;

                //Append acquired data to table
                ///////////////////////////////Display Request Data in Request-Table
                content += '<tr>';
                content += '<td>' + '<a href="hodDashboardCompleteDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                // content += '<td>' + tableRequestType + '</td>';//Column RequestType
                content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                content += '<td>' + tableStudentName + '</td>';//Column StudentName
                content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                content += '</tr>';
                $('#students-leave-table-new').append(content);
        
            });
        }

    });
});

////////////////////////// APPROVED REQUESTS (LEAVE) - STUDENTS ///////////////////////////////////
studentLeaveRequestsRef.orderByChild("status").equalTo("approved(HOD)").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRegisterNumber = tableData.registernumber;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;
    var tableStudentName;

    if(tableRequestType == "leave"){
    ////////////////////////////////Join Requests table and Students table using Register Number

    //reference to table - students
    tableStudentsDataRef = firebase.database().ref("students");

    tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

            tableStudentName = snap.val().studentname;

            //Append acquired data to table
            ///////////////////////////////Display Request Data in Request-Table
            content += '<tr>';
            content += '<td>' + '<a href="hodDashboardCompleteDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
            // content += '<td>' + tableRequestType + '</td>';//Column RequestType
            content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
            content += '<td>' + tableStudentName + '</td>';//Column StudentName
            content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
            content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
            content += '<td>' + tableDayMode + '</td>';//Column Day Mode
            content += '</tr>';
            $('#students-leave-table-approved').append(content);
     
            });
        }
    });
});

////////////////////////// CANCELLED REQUESTS - STUDENTS ///////////////////////////////////
studentLeaveRequestsRef.orderByChild("status").equalTo("cancelled(HOD)").once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRegisterNumber = tableData.registernumber;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;
    var tableStudentName;

    if(tableRequestType == "leave"){
        ////////////////////////////////Join Requests table and Students table using Register Number

        //reference to table - students
        tableStudentsDataRef = firebase.database().ref("students");

        tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

            tableStudentName = snap.val().studentname;

            //Append acquired data to table
            ///////////////////////////////Display Request Data in Request-Table
            content += '<tr>';
            content += '<td>' + '<a href="hodDashboardCompleteDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
            // content += '<td>' + tableRequestType + '</td>';//Column RequestType
            content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
            content += '<td>' + tableStudentName + '</td>';//Column StudentName
            content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
            content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
            content += '<td>' + tableDayMode + '</td>';//Column Day Mode
            content += '</tr>';
            $('#students-leave-table-cancelled').append(content);

            });
        }
    });
});

////////////////////////// HISTORY REQUESTS - STUDENTS ///////////////////////////////////
studentLeaveRequestsRef.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
    
    var content = '';

    //Retrieve Request Data
    var tableData = child.val();

    rowInd = rowInd + 1;

    ////////////////////////////Get the Request Data of the Matched Record
    var tableRequestId = child.key;
    var tableRegisterNumber = tableData.registernumber;
    var tableRequestType = tableData.requesttype;
    var tableRequestDate = tableData.date;
    var tableReasonCategory = tableData.reasoncategory;
    var tableDayMode = tableData.daymode;
    var tableStudentName;

    ////////////////////////////////Join Requests table and Students table using Register Number

    if(tableRequestType == "leave"){
        
    //reference to table - students
    tableStudentsDataRef = firebase.database().ref("students");

    tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

            tableStudentName = snap.val().studentname;

            //Append acquired data to table
            ///////////////////////////////Display Request Data in Request-Table
            content += '<tr>';
            content += '<td>' + '<a href="hodDashboardCompleteDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
            // content += '<td>' + tableRequestType + '</td>';//Column RequestType
            content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
            content += '<td>' + tableStudentName + '</td>';//Column StudentName
            content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
            content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
            content += '<td>' + tableDayMode + '</td>';//Column Day Mode
            content += '</tr>';
            $('#students-leave-table-history').append(content);
     
            });
        }
    });

});
