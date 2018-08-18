function settings() {
    $("button[name='logout']").click(function() {
        localStorage.clear();
        sidebarToggle();
        location.hash = "/innlogging";
    });
}
