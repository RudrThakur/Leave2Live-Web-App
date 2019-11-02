// Rudr Thakur

///////////  Session Handling ////////////////////

if (!localStorage.getItem("staffemail")) {
    window.location.href = '../login.html';

} else {

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

    staffHistoryRef.orderByKey().equalTo(queryRequestId).on("value", function (snapshot) {

        snapshot.forEach(function (child) {

            //Retrieve Request Data
            var detailRequestData = child.val();

            currentRequestId = child.key;

            ///////////////////////////Display Data in the Request Details Modal
            $("#requestid-details").html(child.key);
            $("#noofdays-details").html(detailRequestData.staffdays);
            $("#application-date-details").html(detailRequestData.staffdateofapplication);
            $("#fromdate-details").html(detailRequestData.stafffromdate);
            $("#todate-details").html(detailRequestData.stafftodate);
            $("#work-nature-details").html(detailRequestData.staffworknature);
            $("#leave-nature-details").html(detailRequestData.staffleavenature);
            $("#coff-claim-date").html(detailRequestData.staffcoffdate);
            $("#reason-category-details").html(detailRequestData.reasoncategory);
            $("#reason-specific-details").html(detailRequestData.staffreason);
            $("#arrear-count-details").html(detailRequestData.arrearcount);
            $("#attendance-details").html(detailRequestData.attendance);
            $("#leave-count-details").html(detailRequestData.leavecount);
            $("#status-details").html(detailRequestData.status);
            $("#classteacher-remarks-details").html(detailRequestData.classteacherremarks);
            $("#aco-remarks-details").html(detailRequestData.acoremarks);
            $("#hod-remarks-details").html(detailRequestData.hodremarks);

            proofFileRef = firebase.database().ref("studentproofs");
            proofFileRef.on("value", function (proof) {

                proof.forEach(function (fileURL) {

                    var currentFile = fileURL.val();
                    if (currentFile.requestid == currentRequestId) {
                        var displayProofString = "Click this link to preview";
                        $("#file-proof").html(displayProofString.link(currentFile.url));
                        $("#btn-proof-upload").attr("disabled", "true");
                        $("#proof-upload-error").show();
                    }
                });
            });
        });
    });

    // Cancel Request- Staff
    function staffRequestCancel() {

        $("#updating-message").show();
        setTimeout(function () {
            staffHistoryRef.child(queryRequestId).remove();
            var cancellationCheck = staffHistoryRef.child(queryRequestId);
            if(cancellationCheck){
                // Uh-oh, an error occurred!
                $("#action-failure-message").fadeIn(1000);
                setTimeout(function () {
                    $("#updating-message").hide();
                    $("#action-failure-message").fadeIn();
                }, 5000);
            }
            else{
                $("#action-success-message").fadeIn(1000);
                setTimeout(function () {
                    $("#updating-message").hide();
                    $("#action-success-message").fadeOut();
                }, 5000);

                window.location.href = 'staffHistory.html';
            }

        }, 5000);

    }

    // Logout

    function logout(){
        localStorage.clear();
        window.location.href = '../login.html';
    }




// END
}

