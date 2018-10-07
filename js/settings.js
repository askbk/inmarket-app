function settings() {
    $("button[name='logout']").click(() => {
        localStorage.clear();
        location.hash = "/innlogging";
    });
}
