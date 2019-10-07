//////////////// JS Handler for requestDetails.html
// Rudr Thakur


////////////////////////////////////////////// GLOBALS /////////////////////////////////////////////
var selectedFile;
var currentRequestId;
////////////////////////////////////////////// Functions ///////////////////////////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}

/////////////////////////////////////// Data Retrieval From Firebase ////////////////////////////

//  Session Handling ////////////////////

if (!localStorage.getItem("registernumber")) {

    //Redirect to login page If New User
    window.location.href = 'login.html';
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
    $("#profile-leave-count").html(localStorage.getItem("leavecount"));

}


var detailRequestRef = firebase.database().ref("requests");

//Get current URL
var queryUrl = new URL(window.location.href);

//Fetch queryId
var queryRequestId = queryUrl.searchParams.get("queryid");


//Retrieve Record from firebase of matching RequestId

detailRequestRef.orderByKey().equalTo(queryRequestId).on("value", function(snapshot){

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
 
//////////////////////////////////////
// Proof Attachment Handler
/////////////////////////////////////

$("#proof-file").on("change", function(event){

    selectedFile = event.target.files[0];
    $("#btn-proof-upload").show();
});

function uploadProof(){
    var fileName = selectedFile.name;
    // Create a root reference
    var storageRef = firebase.storage().ref("/studentProofs/" + fileName);
    var uploadTask = storageRef.put(selectedFile);

    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
        alert(error);
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);

          var proofKey = firebase.database().ref("studentproofs/").push().key;
          var proofUpdates = {};
          var proofData = {
              url : downloadURL,
              requestid: currentRequestId
          };

          proofUpdates["/studentproofs/" + proofKey] = proofData;
          firebase.database().ref().update(proofUpdates);
        });
      });

}


//When back button is Clicked
$("#back-btn").click(function(){

    //Go back to Previous Page
    window.location.href ='request.html';
});