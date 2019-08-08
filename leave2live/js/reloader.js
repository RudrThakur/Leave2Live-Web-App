///////////////////////////////////////// Page Reload Functions ////////////////////////////////////////

//Main Reload Function
function pageReloadFunction(){
    setTimeout(showPage, 3000);
}

//Request Details Modal Loader
function showPage(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("mainDiv").style.display = "block";
}