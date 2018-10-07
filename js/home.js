function home() {
    HomeModel.getHomePage();
}

let HomeModel = {
    getHomePage : () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: 'php/getVideos.php',
                beforeSend: request => {
                    request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                },
                type: 'POST',
                success: data => {
                    resolve(true);
                },
                error: (xhr, textStatus, errorThrown) => {
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
