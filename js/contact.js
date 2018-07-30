let postParams = {
    name    : 0,
    picture : 0,
    type    : 1
};

$.ajax({
    url: 'php/getUser.php',
    beforeSend: function(request){
        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
    },
    type: 'POST',
    data: postParams,
    success: function(data) {
        let user = JSON.parse(data);
        let type = user[0];

        switch (type) {
            case 0:
                document.getElementById("0").classList.remove("w3-hide");
                break;
            case 1:
                document.getElementById("1").classList.remove("w3-hide");
                break;
            case 2:
                document.getElementById("2").classList.remove("w3-hide");
                break;
        }
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
