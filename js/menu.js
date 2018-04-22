function toggleMenu() {
    var x = document.getElementById("main-menu");
    if (x.className.indexOf(" w3-show w3-animate-right") == -1) {
        x.className += " w3-show w3-animate-right";
    } else {
        x.className = x.className.replace(" w3-show w3-animate-right", "");
    }
}

var content = document.getElementById("content");

function loadPage(e){
    var href = e.href;

    content.innerHTML = "nuthtrehtreohijrethoijthpothpothjpreothijotjpojiotijprheotirjehptrjehpthjetprhje<br>ågrpejgråjepoj";
}
