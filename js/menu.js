function toggleMenu() {
    var x = document.getElementById("main-menu");
    if (x.className.indexOf(" w3-show w3-animate-right") == -1) {
        x.className += " w3-show w3-animate-right";
    } else {
        x.className = x.className.replace(" w3-show w3-animate-right", "");
    }
}
