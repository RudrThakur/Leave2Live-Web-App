//////////////// JS Handler for request.html

////////////////////////////////////////////// Functions ///////////////////////////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}


/////////////////////////////////////// Data Retrieval From Firebase ////////////////////////////


var detailRequestRef = firebase.database().ref("requests");


for (var i =1; i<=localStorage.getItem("rowcountrequesttable");i++){
    
}

var queryRequestId = "-Lasav74sP1W6wIW0dBx";

detailRequestRef.orderByKey().equalTo(queryRequestId).on("value", function(snapshot){

    snapshot.forEach(function(child) {


        //Retrieve Request Data
        var detailRequestData = child.val();


        ///////////////////////////Display Data in the Request Details Modal
        $("#requestid-details").html(child.key);
        $("#request-type-details").html(detailRequestData.requesttype);
        $("#request-date-details").html(rev(detailRequestData.date));
        $("#fromdate-details").html(rev(detailRequestData.fromdate));
        $("#todate-details").html(rev(detailRequestData.todate));
        $("#day-mode-details").html(detailRequestData.daymode);
        $("#test-check-details").html(detailRequestData.testcheck);
        $("#test-type-details").html(detailRequestData.testtype);
        $("#reason-category-details").html(detailRequestData.reasoncategory);
        $("#reason-specific-details").html(detailRequestData.reasonspecific);
        $("#arrear-count-details").html(detailRequestData.arrearcount);
        $("#attendance-details").html(detailRequestData.attendance);
        $("#leave-history-details").html(detailRequestData.leavehistory);
        $("#status-details").html(detailRequestData.status);
 
    });
});
 