$(document).ready(function() {

    $("#loginForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'php/login.php',
            type: 'POST',
            data: $("#loginForm").serialize(),
            success: function(data) {
                console.log("success");
                let JWT = JSON.parse(data);
                localStorage.jwt = JWT["jwt"];
                location.hash = "/hjem";
            },
            error: function() {
                console.log("not logged in");
                $("#responseText").text("Wrong username/password combination!");
            }
        });
    });
});
