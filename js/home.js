function home() {
    $.ajax({
        url: 'php/getVideos.php',
        beforeSend: function(request){
            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
        },
        type: 'GET',
        success: function(data) {
            console.log("success");
            //printVideos(data);
            document.title = "Hjem | InMarket App";
        },
        error: function(xhr, textStatus, errorThrown) {
            if (xhr.status == 401) {
                console.log("not logged in");
                location.hash = "/innlogging";
            } else {
                console.log("error: " + xhr.status + " " + textStatus + ". " + errorThrown);
                location.hash = "/feil";
            }
        }
    });
}
