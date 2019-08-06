////////////////////////////////JS Handler for staffDashboard.html
// Rudr Thakur

///////////////////////////////////// GLOBALS /////////////////////////////////////////////

var rowInd = 0;

////////////////////////////////////////////// Functions ///////////////////////////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}

//////////////////////////////////////////////// Data Retrieval ////////////////////////////////


//Get Database Reference
var staffDashboardRef = firebase.database().ref("requests");

//Display Leave Form Data From Firebase to Table

staffDashboardRef.once("value", function(snapshot) {
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
    var tableStatus = tableData.status;

    ///////////////////////////////Display Request Data in Request-Tavble
    content += '<tr>';
    content += '<td>' + '<a href="requestDetails.html?queryid=' + tableRequestId + '">' + tableRequestId + '</a>' + '</td>';//Column RequestID
    content += '<td>' + tableRequestType + '</td>';//Column RequestType
    content += '<td>' + rev(tableRequestDate) + '</td>'; //Column RequestDate
    content += '<td>' + tableReasonCategory + '</td>';//Column Reason Category
    content += '<td>' + tableStatus + '</td>';//Column Status
    content += '</tr>';
    $('#staff-dashboard-table').append(content);

  
    });
  });
