function company() {
    if (Router.getParameters().length > 2) {
        parameter = Router.getParameters()[2];
    }

    $.ajax({
        url: 'php/getBedrifter.php?bedrift=' + parameter,
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'GET',
        success: function(data) {
            let bedrift = JSON.parse(data);
            printCompanyInfo(bedrift);
        },
        error: function(xhr, textStatus, errorThrown) {
            if (xhr.status == 401) {
                console.log("not logged in");
                location.hash = "/innlogging";
            } else {
                console.log("error: " + xhr.status);
            }
        }
    });
}

function printCompanyInfo(bedrift) {
    $("#currentPageHeader").text(bedrift["companyName"]);
    $("#description").text(bedrift["description"]);
    document.title = bedrift["companyName"] + " | InMarket App";
}
