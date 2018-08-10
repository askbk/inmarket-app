let login = {
    load    : function () {
        console.log(document.getElementById("loginForm"));
        $("#loginForm").submit(function(e) {
            e.preventDefault();
            console.log("submit");
            $.ajax({
                url: 'php/login.php',
                type: 'POST',
                data: $("#loginForm").serialize(),
                success: function(data) {
                    console.log("success");
                    let JWT = JSON.parse(data);
                    localStorage.jwt = JWT["jwt"];
                    location.hash = "/hjem";
                    $.ajax({
                        url: 'php/getUser.php',
                        beforeSend: function(request){
                            request.setRequestHeader('Authorization', 'Bearer ' + localStorage.jwt);
                        },
                        type: 'POST',
                        data: "name=1&picture=1&id=1",
                        success: function(data) {
                            let user = JSON.parse(data);
                            localStorage.name = user[0];
                            localStorage.id = user[1];
                        },
                        error: function() {}
                    });
                },
                error: function() {
                    console.log("not logged in");
                    $("#responseText").text("Wrong username/password combination!");
                }
            });
        });
    }
}
