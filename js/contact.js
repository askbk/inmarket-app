function contact() {
    switch (localStorage.type) {
        case 0:
            document.getElementById("0").classList.remove("w3-hide");
            break;
        case 1:
            document.getElementById("1").classList.remove("w3-hide");
            break;
        case 2:
            document.getElementById("2").classList.remove("w3-hide");
            break;
    }

    $("form").submit(function (ev) {
        ev.preventDefault();

        
    })
}
