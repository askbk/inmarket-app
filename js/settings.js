function settings() {
    $("button[name='logout']").click(function() {
        localStorage.clear();
        location.hash = "/innlogging";
    });
}
