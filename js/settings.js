$(document).ready(function() {
    $("button[name='logout']").click(function() {
        localStorage.removeItem("jwt");
        location.hash = "/innlogging";
    })
});
