function home() {
    HomeModel.getHomePage();
}

let HomeModel = {
    getHomePage : function () {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: 'php/getVideos.php',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                success: function(data) {
                    resolve(true);
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
        });
    }
};
