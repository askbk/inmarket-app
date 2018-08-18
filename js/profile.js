function profile() {
    let userId = Router.getParameters()[2];

    $.ajax({
        url: 'php/getProfile.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'POST',
        data: "userId=" + userId,
        success: function(data) {
            let profile = JSON.parse(data);
            printProfile(profile);
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

function printProfile(profile) {

}
