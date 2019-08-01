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

            //Get the other Attributes of the Matched Record
            var tableRequestId = tableData.requestid;
            var tableRequestType = tableData.requesttype;
            var tableRequestDate = tableData.date;
            var tableReasonCategory = tableData.reasoncategory;
            var tableStatus = tableData.status;

            //Display Request Data in Request-Tavble
            content += '<tr>';
            content += '<td>' + '<a id="requestid-link" href="#">' + tableRequestId + '</a>'+ '</td>';//Column RequestID
            content += '<td>' + tableRequestType + '</td>';//Column RequestType
            content += '<td>' + rev(tableRequestDate) + '</td>'; //Column RequestDate
            content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
            content += '<td>' + tableStatus + '</td>';//Column Status
            content += '</tr>';
            $('#request-table').append(content);
        }
  
    });
  });



});
