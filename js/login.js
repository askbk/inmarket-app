function login() {
    $("#loginForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'php/login.php',
            type: 'POST',
            data: $("#loginForm").serialize(),
            success: function(data) {
                let JWT = JSON.parse(data);
                localStorage.jwt = JWT["jwt"];
                location.hash = "/hjem";
                $.ajax({
                    url: 'php/getUser.php',
                    beforeSend: function(request){
                        request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                    },
                    type: 'POST',
                    data: "name=1&picture=1&id=1&adminLevel=1&adminGroups=1&type=1",
                    success: function(data) {
                        let user = JSON.parse(data);
                        localStorage.name = user["name"];
                        localStorage.id = user["id"];
                        localStorage.type = user["type"];
                        localStorage.adminLevel = user["adminLevel"];
                        localStorage.adminGroups = JSON.stringify(user["adminGroups"]);
                    },
                    error: function() {}
                });
            },
            error: function() {
                console.log("not logged in");
                $("#responseText").text("Feil brukernavn/passord.");
            }
        });
    });
}
