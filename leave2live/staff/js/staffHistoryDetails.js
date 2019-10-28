// Rudr Thakur

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

    var staffHistoryRef = firebase.database().ref("staffrequests");

    //Get current URL
    var queryUrl = new URL(window.location.href);

    //Fetch queryId
    var queryRequestId = queryUrl.searchParams.get("queryid");


    //Retrieve Record from firebase of matching RequestId

    staffHistoryRef.orderByKey().equalTo(queryRequestId).on("value", function(snapshot){

        snapshot.forEach(function(child) {

            //Retrieve Request Data
            var detailRequestData = child.val();

            currentRequestId = child.key;

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
            $("#classteacher-remarks-details").html(detailRequestData.classteacherremarks);
            $("#aco-remarks-details").html(detailRequestData.acoremarks);
            $("#hod-remarks-details").html(detailRequestData.hodremarks);

            proofFileRef = firebase.database().ref("studentproofs");
            proofFileRef.on("value", function(proof){

                proof.forEach(function(fileURL){

                var currentFile = fileURL.val();
                if (currentFile.requestid == currentRequestId){
                    var displayProofString = "Click this link to preview";
                    $("#file-proof").html(displayProofString.link(currentFile.url));
                    $("#btn-proof-upload").attr("disabled", "true");
                    $("#proof-upload-error").show();
                }
                });
            });
        });
    });

}