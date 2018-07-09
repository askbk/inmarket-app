$(document).ready(function() {
    $("#loginForm").submit(function(e) {
        e.preventDefault();
        $.post(
            "php/login.php", $("#loginForm").serialize(), function(data) {
                $("#responseText").text(data);
                console.log(data);
                let JWT = JSON.parse(data);
                localStorage.jwt = JWT["jwt"];
            }
        );
    });
});
