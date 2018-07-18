$(document).ready(function() {
    document.getElementById("bottomNav").classList.add("w3-hide");
    document.getElementById("hidden-items-top").classList.add("w3-hide");

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
                document.getElementById("bottomNav").classList.remove("w3-hide");
                document.getElementById("hidden-items-top").classList.remove("w3-hide");
            },
            error: function() {
                console.log("not logged in");
                $("#responseText").text("Wrong username/password combination!");
            }
        });
    });
});
