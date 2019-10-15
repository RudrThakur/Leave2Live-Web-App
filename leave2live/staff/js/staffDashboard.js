////////////////////////////////JS Handler for staffDashboard.html
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
}

//Get Database Reference
var staffDashboardRef = firebase.database().ref("requests");

// Disable ACO Option if the staff is NOT ACO
if(localStorage.getItem("staffisacoof") == "NA"){
    $("#staff-role").prop("disabled", "true");
}

//////////////////////////////////////////////// Data Retrieval ////////////////////////////////

// When No Role is selected -> DEFAULT ROLE - Class Teacher
showRequestsForClassTeacher();

function setStaffRole(){
    
    // Delete the rows of table for Role - ACO
    $("#new-requests-table tbody tr").remove(); 
    $("#inprocess-requests-table tbody tr").remove(); 
    $("#cancelled-requests-table tbody tr").remove(); 
    $("#history-requests-table tbody tr").remove(); 

    if($("#staff-role").val() == "ACO"){

        // If Role - ACO
        localStorage.setItem("staffRole", "ACO");
        $(".current-view").html(localStorage.getItem("staffRole"));

        // Display the Request for Class Teacher
        showRequestsForACO();
    }

    if($("#staff-role").val() == "CLASS TEACHER"){
        // If Role - CLASS TEACHER

        localStorage.setItem("staffRole", "CLASS TEACHER");
        $(".current-view").html(localStorage.getItem("staffRole"));
        
        // Display the Request for Class Teacher
        showRequestsForClassTeacher();
    }
};

//////////////////////////
// Display Function for Role - Class Teacher
//////////////////////////

function showRequestsForClassTeacher(){

    //Display Leave Form Data From Firebase to Table

            /////////////////////////////////// New Requests 

            staffDashboardRef.orderByChild("status").equalTo("submitted(CLASS TEACHER)").once("value", function(snapshot) {
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
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    if(snap.val().classandsec == localStorage.getItem("staffisclassteacherof")){

                        tableStudentName = snap.val().studentname;
    
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#new-requests-table').append(content);

                        }
                 
                    });
                });
            });
    
            ///////////////////////////// In Process Requests
    
            staffDashboardRef.orderByChild("status").equalTo("submitted(ACO)").once("value", function(snapshot) {
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
    
                ////////////////////////////////Join Requests table and Students table using Regsiter Number
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    
                    if(snap.val().classandsec == localStorage.getItem("staffisclassteacherof")){
    
                        tableStudentName = snap.val().studentname;
        
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#inprocess-requests-table').append(content);

                        }

                    });
                });
            });
    
            ///////////////////////////// Cancelled Requests
    
            staffDashboardRef.orderByChild("status").equalTo("cancelled(CLASS TEACHER)").once("value", function(snapshot) {
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
    
                ////////////////////////////////Join Requests table and Students table using Regsiter Number
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    
                    if(snap.val().classandsec == localStorage.getItem("staffisclassteacherof")){
    
                        tableStudentName = snap.val().studentname;
        
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#cancelled-requests-table').append(content);

                        }
                    });
    
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
                var tableRegisterNumber = tableData.registernumber;
                var tableRequestType = tableData.requesttype;
                var tableRequestDate = tableData.date;
                var tableReasonCategory = tableData.reasoncategory;
                var tableDayMode = tableData.daymode;
                var tableStudentName;
    
                ////////////////////////////////Join Requests table and Students table using Regsiter Number
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    
                    if(snap.val().classandsec == localStorage.getItem("staffisclassteacherof")){
    
                        tableStudentName = snap.val().studentname;
        
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#history-requests-table').append(content);

                      }

                    });
    
                });
            });
};

//////////////////////////
// Display Function for Role - ACO
//////////////////////////

function showRequestsForACO(){

    //Display Leave Form Data From Firebase to Table

            /////////////////////////////////// New Requests 

            staffDashboardRef.orderByChild("status").equalTo("submitted(ACO)").once("value", function(snapshot) {
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
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    if(snap.val().classandsec == localStorage.getItem("staffisacoof")){
    
                        tableStudentName = snap.val().studentname;
        
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#new-requests-table').append(content);

                        }
                    });
                });
            });
    
            ///////////////////////////// In Process Requests
    
            staffDashboardRef.orderByChild("status").equalTo("submitted(HOD)").once("value", function(snapshot) {
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
    
                ////////////////////////////////Join Requests table and Students table using Regsiter Number
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    if(snap.val().classandsec == localStorage.getItem("staffisacoof")){
    
                        tableStudentName = snap.val().studentname;
        
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#inprocess-requests-table').append(content);

                        }
                    });
                });
            });
    
            ///////////////////////////// Cancelled Requests
    
            staffDashboardRef.orderByChild("status").equalTo("cancelled(ACO)").once("value", function(snapshot) {
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
    
                ////////////////////////////////Join Requests table and Students table using Regsiter Number
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    if(snap.val().classandsec == localStorage.getItem("staffisacoof")){
    
                        tableStudentName = snap.val().studentname;
        
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#cancelled-requests-table').append(content);

                       }

                    });
    
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
                var tableRegisterNumber = tableData.registernumber;
                var tableRequestType = tableData.requesttype;
                var tableRequestDate = tableData.date;
                var tableReasonCategory = tableData.reasoncategory;
                var tableDayMode = tableData.daymode;
                var tableStudentName;
    
                ////////////////////////////////Join Requests table and Students table using Regsiter Number
    
                //reference to table - students
                tableStudentsDataRef = firebase.database().ref("students");
    
                tableStudentsDataRef.child(tableRegisterNumber).once("value", function(snap){

                    if(snap.val().classandsec == localStorage.getItem("staffisacoof")){
    
                        tableStudentName = snap.val().studentname;
        
                        //Append acquired data to table
                        ///////////////////////////////Display Request Data in Request-Table
                        content += '<tr>';
                        content += '<td>' + '<a href="staffDashboardCompleteRequestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
                        content += '<td>' + tableRequestType + '</td>';//Column RequestType
                        content += '<td>' + tableRegisterNumber + '</td>';//Column RegisterNumber
                        content += '<td>' + tableStudentName + '</td>';//Column StudentName
                        content += '<td>' + tableRequestDate + '</td>'; //Column RequestDate
                        content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
                        content += '<td>' + tableDayMode + '</td>';//Column Day Mode
                        content += '</tr>';
                        $('#history-requests-table').append(content);

                        }
                        
                    });
    
                });
            });
};




//Logout Handler

$("#logout-btn").click(function(){

    //Clear Session 
    localStorage.clear();

    //Redirect to login.html
    window.location.href = '../login.html';

});