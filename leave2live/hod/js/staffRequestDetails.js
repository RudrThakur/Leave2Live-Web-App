// Rudr Thakur

if (!localStorage.getItem("hodemail")) {

    //Redirect to login page If New User
    window.location.href = '../login.html';
} else {

    //////////////////////////////////// Loading Student Profile ///////////////////////////

    //Add values to Staff Profile Modal 
    $("#profile-staff-name").html(localStorage.getItem("staffname"));
    $("#profile-staff-id").html(localStorage.getItem("staffid"));
    $("#profile-staff-email").html(localStorage.getItem("staffemail"));
    $("#profile-staff-department").html(localStorage.getItem("staffdepartment"));
    $("#profile-staff-phone").html(localStorage.getItem("staffphone"));

}

////////////////////////////////////////////// Functions ///////////////////////////////////////////

//function to reverse a date
function rev(str) {
    return str.split("-").reverse().join("-");
}

/////////////////////////////////////// Data Retrieval From Firebase ////////////////////////////


//Reference to display Requests Data
var detailRequestRef = firebase.database().ref("staffrequests");

//Get current URL
var queryUrl = new URL(window.location.href);

//Fetch queryId
var queryRequestId = queryUrl.searchParams.get("queryid");

//Fetch Student Record for the query data
var queryStaffId;



//Retrieve Record from firebase of matching RequestId

detailRequestRef.orderByKey().equalTo(queryRequestId).on("value", function (snapshot) {

    snapshot.forEach(function (child) {

        //Retrieve Request Data
        var detailRequestData = child.val();


        //getting the register number of the current query data and then retrieving the student data of the corresponding register number
    
        queryStaffId = detailRequestData.staffid;

        //Reference to display Student Data
        var detailStudenteRef = firebase.database().ref("staff");

        //////////////////////////////JOIN ON REQUESTS TABLE & STUDENT TABLE USING PRIMARY KEY (registernumber)

        //Retrieve Student Record from firebase of matching Register Number
        detailStudenteRef.child(queryStaffId).once("value", function (snapshot) {

            //Retrieve Student Data
            var detailStudentData = snapshot.val();

            ///////////////////////////Display Data in the Request Details Modal
            $("#student-name-details").html(detailStudentData.staffname);
        });

        ////////////////////////////////////////////////// JOIN END 

        ///////////////////////////Display Data in the Request Details Modal

        currentRequestId = child.key;
        $("#requestid-details").html(child.key);
        $("#request-type-details").html(detailRequestData.requesttype);
        $("#register-number-details").html(detailRequestData.registernumber);
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
                }
            });
        });

    });
});

//When back button is Clicked
$("#back-btn").click(function () {

    //Go back to Previous Page
    window.location.href = '../hod/hodDashboard.html';
});

//When an Action Button is Clicked

////////////////////////////////// Update Firebase Data

//Approve Request
$("#approve-btn").click(function () {

    var getCurrentStatusRef = firebase.database().ref("requests/" + queryRequestId);
    var currentStatus;
    var staffRemarks = $("#staff-remarks").val();
    getCurrentStatusRef.once('value').then(function (snapshot) {
        currentStatus = snapshot.child("status").val();

        $("#status-details").hide();
        $("#updating-message").show();

        if ((staffRemarks != "") &&
            (currentStatus == "submitted(" + localStorage.getItem("staffRole") + ")" ||
                currentStatus == "cancelled(" + localStorage.getItem("staffRole") + ")")) {

            setTimeout(function () {
                //Set the status of the Request as SUBMITTED

                if (localStorage.getItem("staffRole") == "CLASS TEACHER") {
                    detailRequestRef.child(queryRequestId).update({
                        status: "submitted(ACO)",
                        classteacherremarks: staffRemarks
                    });
                    //Show Success Message
                    $("#action-success-message").fadeIn(1000);
                }
                if (localStorage.getItem("staffRole") == "ACO") {
                    detailRequestRef.child(queryRequestId).update({
                        status: "submitted(HOD)",
                        acoremarks: staffRemarks
                    });
                    //Show Success Message
                    $("#action-success-message").fadeIn(1000);
                }
            }, 5000);

            //Hide after 5 seconds
            setTimeout(function () {
                $("#updating-message").hide();
                $("#action-success-message").fadeOut();
            }, 5000);

            //Hide after 5 seconds
            setTimeout(function () {
                //reload the page
                location.reload();
                $("#status-details").show();
            }, 7000);

        } else {
            setTimeout(function () {
                $("#updating-message").hide();
                $("#action-failure-message").fadeIn();
            }, 5000);

            //Hide after 5 seconds
            setTimeout(function () {
                //reload the page
                $("#action-failure-message").fadeOut();
                $("#status-details").show();
            }, 7000)
        }

    });
});


//Deny Request
$("#deny-btn").click(function () {

    var getCurrentStatusRef = firebase.database().ref("requests/" + queryRequestId);
    var currentStatus;
    var staffRemarks = $("#staff-remarks").val();
    getCurrentStatusRef.once('value').then(function (snapshot) {
        currentStatus = snapshot.child("status").val();

        $("#status-details").hide();
        $("#updating-message").show();

        if ((staffRemarks != "") &&
            (currentStatus == "submitted(" + localStorage.getItem("staffRole") + ")" ||
                currentStatus == "cancelled(" + localStorage.getItem("staffRole") + ")")) {

            setTimeout(function () {
                //Set the status of the Request as CANCELLED
                if (localStorage.getItem("staffRole") == "CLASS TEACHER") {
                    detailRequestRef.child(queryRequestId).update({
                        status: "cancelled(ACO)",
                        classteacherremarks: staffRemarks
                    });
                    //Show Success Message
                    $("#action-success-message").fadeIn(1000);
                }

                if (localStorage.getItem("staffRole") == "ACO") {
                    detailRequestRef.child(queryRequestId).update({
                        status: "cancelled(HOD)",
                        acoremarks: staffRemarks
                    });
                    //Show Success Message
                    $("#action-success-message").fadeIn(1000);
                }


            }, 5000);

            //Hide after 5 seconds
            setTimeout(function () {
                $("#updating-message").hide();
                $("#action-success-message").fadeOut();
            }, 5000);

            //Hide after 5 seconds
            setTimeout(function () {
                //reload the page
                location.reload();
                $("#status-details").show();
            }, 7000)

        } else {
            setTimeout(function () {
                $("#updating-message").hide();
                $("#action-failure-message").fadeIn();
            }, 5000);

            //Hide after 5 seconds
            setTimeout(function () {
                //reload the page
                $("#action-failure-message").fadeOut();
                $("#status-details").show();
            }, 7000)
        }
    });
});

// Logout

function logout() {

    localStorage.clear();
    window.location.href = '../login.html';

}
